const { SYMBOLS, TYPES } = require("../constant/constants")

export const valideNames = (value, type) => {
    const size = value.length
    if ((size < 3) || (size > 30) || (!(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/).test(value)))
        return `Invalid ${type} name`
    return ''
}

export const valideEmail = (value) => {
    if (value.length <= 120 && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value))
        return ''
    return 'Invalid email format'
}

export const valideDescription = (value) => {
    if (value.length <= 1024 && (/^$|^[0-9A-Za-zÀ-ÖØ-öø-ÿ ]+$/).test(value))
        return ''
    return 'Invalid description'
}

export const valideKeys = (value, keyType, dialogType) => {
    if (dialogType === 'edit') {
        if ((value.length === 64 && (/^[0-9A-Za-zÀ-ÖØ-öø-ÿ]+$/).test(value)) || (value === ''))
            return ''
    }

    if (dialogType === 'create') {
        if ((value.length === 64 && (/^[0-9A-Za-zÀ-ÖØ-öø-ÿ]+$/).test(value)))
            return ''
    }

    return `Invalid ${keyType} key`
}

export const validePassword = (value) => {
    if ((value.length >= 8 && value.length <= 16 && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)))
        return ''
    return 'Invalid password format'
}

export const valideSymbol = (symbol) => {
    if (SYMBOLS.includes(symbol))
        return ''
    return 'Invalid pair'
}

export const valideType = (type) => {
    if (TYPES.includes(type))
        return ''
    return 'Invalid type'
}

export const valideAmount = (amount) => {
    if (Number(amount))
        return ''
    return 'Invalid amount'
}

export const valideSide = (side) => {
    if (side === 'BUY' || side === 'SELL')
        return ''
    return 'Invalid side'
}

export const valideSearchInput = (value) => {
    const size = value.length
    if ((size < 1) || (size > 60) || (!(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/).test(value)))
        return 'Invalid search value'
    return ''
}