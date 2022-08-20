const { Schema, model } = require('mongoose')

let schema = Schema({
  id: {
    type: String,
    required: true
  },

  guildId: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  }
})

module.exports = model('Role', schema)