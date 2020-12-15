const { Schema, model } = require('mongoose')

const News = new Schema({
  title: { type: String, required: true, unique: true },
  previewUrl: { type: String, required: true },
  content: { type: String }, // !!!!!!!!!!!!!!!!!!
  date: { type: Date, required: true },
})

module.exports = model('News', News)
