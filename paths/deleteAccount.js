const pool = require('../pool')
const bcrypt = require("bcryptjs");

const deleteAccount = async (req, res) => {
    try {
        const headers = req.headers
        if(headers.cookie) {
            const sessionId = headers.cookie.split('=')[1]
            const { name } = sessions[sessionId];
            const user = (await pool.query(
                'SELECT name, password FROM users WHERE name = $1',
                [name]
            )).rows[0];
            const { password } = user;
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