const pg = require('pg')
const pool = new pg.Pool({
    "user": "ukufkcaagtphfw",
    "port": 5432,
    "host": "ec2-54-225-234-165.compute-1.amazonaws.com",
    "database": "d4fk3mchvn2pem",
    "password": '09e8e360a9aa5b45f2897db6044e65810adad2c092fea124ba496dbfa1284a5d',
    "ssl": { rejectUnauthorized: false }
})

module.exports = pool;