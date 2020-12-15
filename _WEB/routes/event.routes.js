const { Router } = require('express')
const Event = require('../models/Event')
const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    res.json(event)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/add', async (req, res) => {
  try {
    const { name, date, previewUrl, content, place, link } = req.body
    const event = new Place({
      name, date, previewUrl, content, place, link,
    })

    await event.save()

    res.status(201).json({ place })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(event)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id, req.body)
    res.status(200).json(event)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
