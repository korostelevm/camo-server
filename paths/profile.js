const pool = require('../pool')

const getUser = [
    '/user/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const users = (await pool.query(
                'SELECT * FROM profilePages WHERE id = $1',
                [id]
            )).rows
            res.json(users)
        } catch(e) {
            console.error(e.message)
        }
    }
]


module.exports = [getUser]