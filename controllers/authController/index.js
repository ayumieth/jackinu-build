const config = require('../../config')

const get = async (req, res, next) => {
    if (req.user) {
        res.json({ msg: "authorized", user: req.user })
    } else {
        res.json({ msg: "unauthorized" })
    }
}

module.exports = {
    get,

}