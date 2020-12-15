const { Router } = require('express')
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')
const { check, validationResult } = require('express-validator')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('pwd', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }
      const { email, name, pwd } = req.body
      const candidate = await Admin.findOne({ email })
      if (candidate) {
        res.status(400).json({ message: 'Такой пользователь уже существует' })
      }
      const hashedPassword = await bcrypt.hash(pwd, 12)
      const admin = new Admin({ email, name, pwd: hashedPassword })
      await admin.save()
      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').isEmail(),
    check('pwd', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // console.log(errors, req.body.email)

        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при авторизации',
        })
      }
      const { email, pwd } = req.body
      console.log(email, pwd)
      const admin = await Admin.findOne({ email })
      if (!admin) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
      const isMatch = await bcrypt.compare(pwd, admin.pwd)
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
      const token = jwt.sign(
        { adminId: admin.id },
        config.get('jwtSecret'),
        { expiresIn: '6h' },
      )
      res.json({ token, adminId: admin.id })
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
