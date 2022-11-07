const pool = require('../pool')
const bcrypt = require("bcryptjs");
const {v4: randomSessionId} = require("uuid");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = (await pool?.query(
            'SELECT id, password FROM users WHERE username = $1',
            [username]
        )).rows;
        if(!user.length || !(await bcrypt.compare(password, user[0].password))) {
            return res.status(400).send('Wrong credentials')
        }
        const sessionId = (randomSessionId()).slice(0, 101);
        await pool?.query(
            'INSERT INTO sessions(id, username) VALUES($1, $2)',
            [sessionId, username]
        )
        res.set('Set-Cookie', `session=${sessionId}`)
        res.send('Success')
    } catch (e) {
        console.log(e)
        res.status(500).send('Unexpected issue')
    }
}

module.exports = login