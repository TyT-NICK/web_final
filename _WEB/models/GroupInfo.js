const { Schema, model } = require('mongoose')

const GroupInfo = new Schema({
  _uid: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true },
  description: { type: Buffer }, // !!!!!!!!!!!!!!!!!!
})
module.exports = model('GroupInfo', GroupInfo)
