const express = require('express')
const router = express.Router()
const controllers = require('../controllers/client/client')
const { userValidationRules, validate } = require('../controllers/validator')

// get all clients
router.get('/', controllers.getAllClients)

// create new client
router.post('/create', userValidationRules(), validate, controllers.createClient)

module.exports = router