const express = require('express')
const cors = require('cors')
const pool = require('./pool')
const {getUser} = require('./paths/profile')
const {getUsers} = require('./paths/usersList')
const {login} = require('./paths/login')
const {register} = require('./paths/register')
const {logout} = require('./paths/logout')
const {deleteAccount} = require('./paths/deleteAccount')

const app = express()

//middleware
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;
sessions = {};

//ROUTES//
app.post('/users/register', register)
app.post('/users/login', login)
app.get('/users/logout', logout)
app.post('/users/delete', deleteAccount)
app.get('/user/:id', getUser)
app.get('/users/list/:maxId/:limit', getUsers)

app.listen(port, async () => {
    try {
        console.log(`server has started on port ${port}`)
        await pool.query(
            'ALTER SEQUENCE users_id_seq RESTART'
        );
    } catch (e) {
        console.log(e);
    }
})