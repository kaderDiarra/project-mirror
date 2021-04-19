require('dotenv').config()
const axios = require('axios')
const qs = require('qs')
const createSignature = require('../utils/create-signature')

// https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb

const axiosError = (error) => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
}

const apiTest = (req, res) => {
    const list = ["item1", "item2", "item3"];

    /*** */
    const axiosInstance = axios.create({
        baseURL: 'https://testnet.binance.vision/api/v3/',
        timeout: 7000,
        headers: {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': process.env.API_KEY_TESTNET
        }
    })
    const orderInfo = {
        symbol: 'BNBBUSD',
        side: 'SELL',
        type: 'MARKET',
        quantity:1,
        newClientOrderId: 'order48',
        newOrderRespType: 'ACK',
        timestamp: Date.now(),
        //signature: signature
    }
    orderInfo.signature = createSignature(orderInfo)
    console.log("query: ", qs.stringify(orderInfo))
    /*axiosInstance.get('exchangeInfo')
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            axiosError(error)
        })*/
    axiosInstance.post('order', null, {
        params: {...orderInfo}
    })
        .then(response => {
            //res.sendStatus(response.status)
            res.json(response.data)
            console.log("data: ", response.data)
        })
        .catch(error => {
            axiosError(error)
            res.sendStatus(error.response.status)
        })
    /*** */
}

exports.apiTest = apiTest