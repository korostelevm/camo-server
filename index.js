const express = require('express')
const cors = require('cors')
const pool = require('./pool')

const { getUser } = require('./paths/profile')
const { getUsers } = require('./paths/usersList')

const app = express()

//middleware
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;

//ROUTES//
app.get('/user/:id', getUser)
app.get('/users/:maxId/:limit', getUsers)

app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})