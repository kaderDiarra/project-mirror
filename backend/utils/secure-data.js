require('dotenv').config()
const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const iv = crypto.randomBytes(16)
const ROUNDS = +process.env.KEY_ROUNDS
const KEY_SIZE = +process.env.KEY_SIZE
const SECRET = process.env.SECRET_KEY_CRYPTO

async function encrypt(text) {
    const salt = crypto.createHash('sha1').update(SECRET).digest("hex")
    const key = crypto.pbkdf2Sync(SECRET, salt, ROUNDS, KEY_SIZE, 'sha512');


    const cipher = crypto.createCipheriv(algorithm, key, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}

async function decrypt(hash) {
    const salt = crypto.createHash('sha1').update(SECRET).digest("hex")
    const key = crypto.pbkdf2Sync(SECRET, salt, ROUNDS, KEY_SIZE, 'sha512');
    const { iv, content } = hash

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()])

    return decrypted.toString()
}

/*async function test() {
    const text = "toto et titi"
    const res = await encrypt(text)
    console.log("encrypted: ", res)
    const response = await decrypt(res)
    return response
}

test()
    .then(res => console.log(res))
    .catch(err => console.log(err))*/

module.exports = {
    encrypt,
    decrypt
}