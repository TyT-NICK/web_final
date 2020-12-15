const { Schema, model } = require('mongoose')

const Event = new Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  previewUrl: { type: String, required: true },
  content: { type: String },
  place: { type: String, required: true },
  link: { type: String, required: true },
})

module.exports = model('Event', Event)
