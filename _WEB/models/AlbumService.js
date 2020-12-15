const { Schema, model } = require('mongoose')

const AlbumService = new Schema({
  link: { type: String, required: true },
})

module.exports = model('AlbumService', AlbumService)
