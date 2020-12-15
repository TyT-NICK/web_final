const { Schema, model } = require('mongoose')

const Member = new Schema({
  name: { type: String, required: true, unique: true },
  socialUrl: { type: String, required: true },
  photoUrl: { type: String, required: true },
  description: { type: Buffer }, // !!!!!!!!!!!!!!!!!!
})
module.exports = model('Member', Member)
