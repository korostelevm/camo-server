const pool = require('../pool')

const getUsers = async (req, res) => {
    try {
        const headers = req.headers
        if(headers.cookie) {
            const {maxId, limit} = req.params
            const users = (await pool.query(
                'SELECT * FROM usersList WHERE id > $1 LIMIT $2',
                [maxId, limit]
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

module.exports.getUsers = getUsers