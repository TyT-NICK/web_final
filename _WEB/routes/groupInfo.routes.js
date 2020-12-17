const { Router } = require('express')
const GroupInfo = require('../models/GroupInfo')
const Member = require('../models/Member')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const info = await GroupInfo.find()
    const members = await Member.find()
    res.json({ info: info, members: members })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/', async (req, res) => {
  try {
    const info = await GroupInfo.updateOne({ _uid: 1 }, req.body)
    res.status(200).json(info)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
