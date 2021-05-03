const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()
const apiTestRouter = require('./routes/api-test')
const clientRouter = require('./routes/client')
const tradingRouter = require('./routes/trade')

async function dbConnection() {
    const mongoConnectOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
    await mongoose.connect(process.env.MONGO_DB_URL, mongoConnectOpt)
}

// connect to mongodb
dbConnection()
    .then(() => {
        console.log('connected to db')
        app.listen(PORT, () => {
            console.log(`Listening on Port: ${PORT}`)
        })
    })
    .catch(err => console.log(err))

app.use(cors())
// json api
app.use(express.json())

app.use('/', apiTestRouter)
app.use('/client', clientRouter)
app.use('/trade', tradingRouter)
