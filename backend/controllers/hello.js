const hello = (req, res) => {
    const list = ["item1", "item2", "item3"];
    res.json(list)
}

exports.hello = hello