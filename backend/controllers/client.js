const Client = require('../models/client')

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
        const client = new Client({firstName, lastName, email, apiKey, secretKey})
        const result = await client.save()
        res.status(201).send(result)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
