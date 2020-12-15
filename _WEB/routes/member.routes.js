const { Router } = require('express')
const Member = require('../models/Member')
const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
    res.json(member)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', async (req, res) => {
  try {
    const members = await Member.find()
    res.json(members)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/add', async (req, res) => {
  try {
    const { name, socialUrl, photoUrl, description } = req.body
    const member = new Member({
      name, socialUrl, photoUrl, description,
    })

    await member.save()

    res.status(201).json({ member })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(member)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndRemove(req.params.id, req.body)
    res.status(200).json(member)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
