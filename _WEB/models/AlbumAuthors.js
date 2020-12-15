const { Schema, model } = require('mongoose')

const AlbumAuthors = new Schema({
  name: { type: String, required: true, unique: true },
  socialUrl: { type: String, required: true },
  description: { type: String, required: true },
})

module.exports = model('AlbumAuthors', AlbumAuthors)
