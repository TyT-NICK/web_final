const { Router } = require('express')
const Album = require('../models/Album')
const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
    res.json(album)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', async (req, res) => {
  try {
    const albums = await Album.find()
    res.json(albums)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/add', async (req, res) => {
  try {
    const { title, imgUrl, AlbumAuthors, AlbumServices, Tracks } = req.body
    const album = new Album({
      title, imgUrl, AlbumAuthors, AlbumServices, Tracks,
    })

    await album.save()

    res.status(201).json({ album })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(album)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndRemove(req.params.id, req.body)
    res.status(200).json(album)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
