const mongoose = require('mongoose')
const Schema = mongoose.Schema

// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const clientSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    description: { type: String },
    image: { type: String },
    enable: {type: Boolean, default: false},
    apiKey: {
        iv: { type: String, required: true },
        content: { type: String, required: true }
    },
    secretKey: {
        iv: { type: String, required: true },
        content: { type: String, required: true }
    }
}, { timestamps: true })

const Client = mongoose.model('Client', clientSchema)

module.exports = Client

