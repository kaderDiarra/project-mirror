const { matchedData } = require('express-validator')

exports.trade = (req, res) => {
    // list of id
    // trade option
    const body = matchedData(req, { locations: ['body'] })
    console.log(body)
    res.status(200).send("Work")
}