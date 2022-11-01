const pool = require('../pool')
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const {name, password} = req.body;
        if (!name || !password || name.length < 8 || password.length < 8) {
            return res.status(400).send('Invalid credentials')
        }
        const registered = Boolean((await pool.query(
            'SELECT * FROM users WHERE name = $1',
            [name]
        )).rows.length === 1);
        if(registered) {
            res.status(409).send('already exists')
        } else {
            const hash = (await bcrypt.hash(password, 5));
            await pool.query(
                "INSERT INTO users(name, password) VALUES($1, $2)",
                [name, hash]
            );
            res.send('Success')
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('Unexpected issue')
    }
}

module.exports.register = register