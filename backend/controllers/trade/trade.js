const { matchedData } = require('express-validator')
const axios = require('axios')
const Client = require('../../models/client')
const { decrypt } = require('../../utils/secure-data')
const { axiosError } = require('../../utils/axios-utils')
const createSignature = require('../../utils/create-signature')
const { createHistory } = require('../../controllers/history/history')

const axiosInstance = axios.create({
    baseURL: process.env.BINANCE_API_URL,
    timeout: 5000,
})

const binanceOrder = async (client, orderInfo) => {
    const clientInfoToSend = {
        userId: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
    }

    const newOrderInfo = {...orderInfo}

    const apiKey = decrypt(client.apiKey)
    const secretKey = decrypt(client.secretKey)
    try {
        newOrderInfo.timestamp = Date.now()
        newOrderInfo.signature = createSignature(secretKey, newOrderInfo)
        //axiosInstance.default.common['X-MBX-APIKEY'] = apiKey
        const result = await axiosInstance.post('order', null, {
            params: {...newOrderInfo},
            headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': apiKey
            }
        })
        console.log("res: ", result.headers)
        return {
            ...clientInfoToSend,
            status: true,
        }

    } catch (error) {
        console.log('FAIL:')
        console.log(`id: ${client._id} name: ${client.firstName} ${client.lastName}`)
        axiosError(error)
        return {
            ...clientInfoToSend,
            status: false,
        }
    }
}


/**
 * if there are performance issues with the endpoint above, these API clusters are also available:
 *      https://api1.binance.com
 *      https://api2.binance.com
 *      https://api3.binance.com
 *
 */
// https://api.binance.com/api/v3/

function getSucessQuantity(results) {
    const reducer = (accumulaor, currentValue) => {
        if (currentValue.status)
            return (accumulaor + 1)
        return accumulaor
    }
    return ({
        total: results.length,
        successful: results.reduce(reducer, 0)
    })
}

exports.trade = async (req, res) => {
    const body = matchedData(req, { locations: ['body'] })
    const clientsId = body.clientsId
    const orderInfo = { symbol: body.symbol, side: body.side, type: body.type, quoteOrderQty: body.quoteOrderQty, /*quantity: body.quantity, price: body.price, timeInForce: body.timeInForce */} // timeInForce, newClientOrderId
    // retrieve all clients
    try {
        const clients = await Client.find({'_id': {
            $in: clientsId,
        }})

        const promises = clients.map(async client => {
            const result = await binanceOrder(client, orderInfo)
            return result
        })
        const ordersResponse = await Promise.all(promises)
        await createHistory({
            data: ordersResponse,
            info: {
                side: orderInfo.side,
                symbol: orderInfo.symbol,
                successQuantity: getSucessQuantity(ordersResponse),
            }
        })
        res.status(200).send(ordersResponse)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}