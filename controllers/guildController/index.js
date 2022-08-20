const guildService = require('../../services/guildService');

const get = async (req, res, next) => {
    let result = await guildService.getGuilds(req);
    res.json(result)
}

// const create = async (req, res, next) => {
// }

// const update = async (req, res, next) => {

// }

// const remove = async (req, res, next) => {

// }

module.exports = {
    get,
    // create,
    // update,
    // remove,
}