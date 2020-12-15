const { Router } = require('express')
const News = require('../models/News')
const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    res.json(news)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', async (req, res) => {
  try {
    const news = await News.find()
    // res.send('12')
    res.json(news)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, previewUrl, content, date } = req.body
    const news = new News({
      title, previewUrl, content, date,
    })

    await news.save()

    res.status(201).json({ news })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(news)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndRemove(req.params.id, req.body)
    res.status(200).json(news)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
