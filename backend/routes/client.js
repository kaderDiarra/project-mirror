const express = require('express')
const router = express.Router()
const controllers = require('../controllers/client')

// get all clients
router.get('/', controllers.getAllClients)

// create new client
router.post('/create', controllers.createClient)

module.exports = router