const { Schema, model, Types } = require('mongoose')

const MerchCategory = new Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    groupImgUrl: { type: String, required: true },
    })
module.exports = model('MerchCategory', MerchCategory)