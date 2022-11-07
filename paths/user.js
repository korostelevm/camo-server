const pool = require('../pool')

const getUser = async (req, res) => {
    try {
        const headers = req.headers
        if(headers.cookie) {
            const {username} = req.params
            const users = (await pool?.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            )).rows
            res.json(users)
        } else {
            res.send('Log in first')
        }
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Unexpected issue')
    }
}

module.exports = getUser