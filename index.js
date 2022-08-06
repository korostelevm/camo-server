const express = require('express')
const cors = require('cors')
const pool = require('./pool')

const app = express()

//middleware
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;

//ROUTES//
require('./paths/usersList').map(options => app.get(...options))

//middleware
app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})