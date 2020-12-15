const { Router } = require('express')
const MerchCategory = require('../models/MerchCategory')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const category = await MerchCategory.findById(req.params.id)
        res.json(category)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await MerchCategory.find()
        res.json(categories)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name, link, groupImgUrl } = req.body
        const category = new MerchCategory({
            name, link, groupImgUrl
        })

        await category.save()

        res.status(201).json({ category })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const category = await MerchCategory.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(category)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const category = await MerchCategory.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(category)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router