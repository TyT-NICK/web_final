const { Schema, model } = require('mongoose')

const Track = new Schema({
  name: { type: String, required: true, unique: true },
})

module.exports = model('Track', Track)
