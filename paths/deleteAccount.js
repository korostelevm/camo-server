const pool = require('../pool')
const bcrypt = require("bcryptjs");

const deleteAccount = async (req, res) => {
    try {
        const headers = req.headers
        if(headers.cookie) {
            const { name, password } = req.body;
            const user = (await pool.query(
                'SELECT id, password FROM users WHERE name = $1',
                [name]
            )).rows;
            if(!user.length || !(await bcrypt.compare(password, user[0].password))) {
                return res.status(400).send('Wrong credentials')
            }
            const sessionId = headers.cookie.split('=')[1]
            delete sessions[sessionId]
            res.set('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT')
            await pool.query(
                "DELETE FROM users WHERE name = $1",
                [name]
            );
            res.send('Success')
        } else {
            res.send('Log in first')
        }

    } catch (e) {
        console.log(e)
        res.status(500).send('Unexpected issue')
    }
}

module.exports.deleteAccount = deleteAccount