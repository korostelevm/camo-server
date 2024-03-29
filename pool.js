const pg = require('pg')
const dotenv = require("dotenv")

dotenv.config()


const pool = new pg.Pool({
    "connectionString": process.env.DB_CONNECTION_STRING,
    "ssl": { rejectUnauthorized: false }
})

module.exports = pool;