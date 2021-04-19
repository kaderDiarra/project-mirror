const crypto = require('crypto')
const qs = require('qs')

function createSignature(data) {
    const dataQueryString = qs.stringify(data)
    const signature = crypto.createHmac('sha256', process.env.SECRET_KEY_TESTNET)
        .update(dataQueryString)
        .digest('hex')
    return signature
}

module.exports = createSignature