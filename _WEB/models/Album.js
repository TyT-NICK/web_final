const { Schema, model } = require('mongoose')

const Album = new Schema({
  title: { type: String, required: true, unique: true },
  caption: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true },
  AlbumAuthors: { type: Array, required: true },
  AlbumServices: { type: Array, required: true },
  Tracks: { type: Array, required: true },
})
module.exports = model('Album', Album)
