const express = require('express')
require('dotenv').config()

const app = express()
const hello = require('./routes/hello')

// app.get('/', (req, res) => {
//     res.send('Hello Kader 31')
// })

app.use('/', hello)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})