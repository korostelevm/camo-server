const pool = require('../pool')
const bcrypt = require("bcryptjs");
const {v4: randomSessionId} = require("uuid");

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = (await pool.query(
            'SELECT id, password FROM users WHERE name = $1',
            [name]
        )).rows;
        if(!user.length || !(await bcrypt.compare(password, user[0].password))) {
            return res.status(400).send('Wrong credentials')
        }
        const sessionId = randomSessionId();
        sessions[sessionId] = {
            name,
            password
        }
        res.set('Set-Cookie', `session=${sessionId}`)
        res.send('Success')
    } catch (e) {
        console.log(e)
        res.status(500).send('Unexpected issue')
    }
}

module.exports.login = login