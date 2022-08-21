const pool = require('../pool')

const getUsers = async (req, res) => {
    try {
        const {maxId, limit} = req.params
        const users = (await pool.query(
            'SELECT * FROM users WHERE id > $1 LIMIT $2',
            [maxId, limit]
        )).rows
        res.json(users)
    } catch (e) {
        console.error(e.message)
    }
}

/*app.post("", async (req, res) => {
    try {

    } catch (e) {
        console.error(e.message);
    }
});*/

/*app.put("/users/:id", async (req, res) => {
    try {

    } catch (e) {
        console.error(e.message);
    }
});*/

/*app.delete("/users/:id", async (req, res) => {
    try {

    } catch (e) {
        console.log(e.message);
    }
});*/

module.exports.getUsers = getUsers