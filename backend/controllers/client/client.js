const Client = require('../../models/client')
const { encrypt } = require('../../utils/secure-data')

exports.getAllClients = async(req, res) => {
    try {
        const clients = await Client.find({})
        res.status(200).send(clients)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.createClient = async(req, res) => {
    const { firstName, lastName, email, apiKey, secretKey } = req.body

    try {
        const cryptedApiKey = encrypt(apiKey)
        const cryptedSecretKey = encrypt(secretKey)

        const client = new Client({
            firstName,
            lastName,
            email,
            apiKey: {
                iv: cryptedApiKey?.iv,
                content: cryptedApiKey?.content
            },
            secretKey: {
                iv: cryptedSecretKey?.iv,
                content: cryptedSecretKey?.content
            }
        })
        const result = await client.save()
        res.status(201).send(result)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
