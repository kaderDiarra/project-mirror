const express = require('express')
const router = express.Router()
const { param } = require('express-validator')

const controllers = require('../controllers/client/client')
const { userValidationRules, userDeletionRules, userUpdateRules, validate } = require('../controllers/validator')

// get all clients
router.get('/', controllers.getAllClients)

// create new client
router.post('/create', userValidationRules(), validate, controllers.createClient)

// https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
// delete client
router.delete('/delete/:id', userDeletionRules(), validate, controllers.deleteClient)

// update user
router.patch('/update/:_id', userUpdateRules(), validate, controllers.updateUser)

module.exports = router