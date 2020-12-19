const { Router } = require('express')
const Admin = require('../models/Admin')
const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
    res.json(admin)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find()
    res.json(admins)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/add', async (req, res) => {
  try {
    const { name, email, pwd } = req.body
    const admin = new Admin({
      name, email, pwd,
    })

    await admin.save()

    res.status(201).json({ admin })
  } catch (e) {
    console.log(e.message)
    console.log(req.body)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(admin)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndRemove(req.params.id, req.body)
    res.status(200).json(admin)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
