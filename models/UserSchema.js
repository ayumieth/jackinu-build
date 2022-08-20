const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
const RoleSchema = require('./RoleSchema');

let schema = Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    discordTag: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: ''
    },
    guilds: {
        type: Array,
        required: true
    },
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoleSchema' }]
})

module.exports = model('User', schema)