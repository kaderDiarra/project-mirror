const express = require('express')
const controllers = require('../controllers/trade/trade')
const { tradingRules, validate } = require('../controllers/validator')
const router = express.Router()

router.post('/', tradingRules(), validate, controllers.trade)

module.exports = router