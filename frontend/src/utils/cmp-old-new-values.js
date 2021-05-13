const compareOldAndNewValues = (oldValues, newValues, exclude) => {
    const result = {}
    Object.keys(newValues).forEach(key => {
        if (newValues[key] === oldValues[key] && (!exclude.includes(key)))
            result[key] = undefined
        else
            result[key] = newValues[key]
    })
    return result
}

export default compareOldAndNewValues