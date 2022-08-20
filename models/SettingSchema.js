const { Schema, model } = require('mongoose')

let schema = Schema({
    paypal: {
        type: String,
        required: true
    },
    stripe: {
      type: String,
      required: true
    },
    crypto: {
      type: String,
      required: true
    }
})

module.exports = model('Setting', schema)