const { Schema, model } = require('mongoose')

const Admin = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
})
module.exports = model('Admin', Admin)
