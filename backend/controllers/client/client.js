const { matchedData } = require('express-validator')
const Client = require('../../models/client')
const { encrypt } = require('../../utils/secure-data')

const projection = {
    apiKey: 0,
    secretKey: 0,
    createdAt: 0,
    updatedAt: 0,
    enable: 0,
    __v: 0,
}

exports.getAllClients = async(req, res) => {
    try {
        const clients = await Client.find({}, {...projection})
        res.status(200).send(clients)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}

exports.createClient = async(req, res) => {
    const body = matchedData(req, { locations: ['body'] })
    const { firstName, lastName, email, apiKey, secretKey, image, description } = body

    try {
        const cryptedApiKey = encrypt(apiKey)
        const cryptedSecretKey = encrypt(secretKey)

        const client = new Client({
            firstName,
            lastName,
            email,
            description,
            image,
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
        res.status(500).end()
    }
}

exports.deleteClient = async(req, res) => {
    const params = matchedData(req, { locations: ['params'] })
    const id = params.id

    try {
        const response = await Client.findByIdAndDelete(id)
        if (response)
            res.status(200).send(true)
        else
            throw new Error("User not deleted or not find")
    } catch (error) {
        console.log(error)
        res.status(500).send(false)
    }
}

exports.updateUser = async(req, res) => {
    try {
        const body = matchedData(req, { locations: ['body'] })
        const params = matchedData(req, { locations: ['params'] })
        const _id = params._id
        console.log("id: ", _id)
        const { firstName, lastName, email, image, description } = body
        let { apiKey, secretKey } = body

        if (!_id || !body)
            throw new Error("Undefined or Invalid body or query")
        if (apiKey)
            apiKey = encrypt(apiKey)
        if (secretKey)
            secretKey = encrypt(secretKey)

        const updateData = {
            firstName, lastName, email, apiKey, secretKey, image, description,
        }
        const option = {
            omitUndefined: true,
            new: true,
        }

        const result = await Client.findByIdAndUpdate(_id, updateData, option)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}
