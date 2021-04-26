const { body, validationResult } = require('express-validator')
const { isValidApiKey, isValidSecretKey } = require('../utils/validate-keys')

const isAlphaWithSpace = value => value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/)

const userValidationRules = () => {
    return [
        body('firstName', 'Invalid first name').notEmpty().isString().custom(isAlphaWithSpace).isLength({ min: 3, max: 30 }).toLowerCase(),
        body('lastName', 'Invalid last name').notEmpty().isString().custom(isAlphaWithSpace).isLength({ min: 3, max: 30 }).toLowerCase(),
        body('email', 'Invalid email').notEmpty().isEmail(),
        body('apiKey', 'Invalid api key').notEmpty().isString().isLength({ min: 64, max: 64 }).custom(isValidApiKey),
        body('secretKey', 'Invalid secret key').notEmpty().isString().isLength({ min: 64, max: 64 }).custom(isValidSecretKey),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty())
        return next();

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}
