const { Schema, model } = require('mongoose')
const cfg = require('../config')
let schema = Schema({
    guildID: {
        type: String
    },
    prefix: {
        type: String,
        default: cfg.prefix
    }
})

module.exports = model('Guilds', schema)