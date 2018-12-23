const mongoose = require('mongoose')
const dictBaseSchema = require('../tools/dictBaseSchema')
const {
    Schema
} = mongoose

const PayTypeSchema = new Schema({
},{
    timestamps: true
})
PayTypeSchema.add(dictBaseSchema)

module.exports = mongoose.model('PayType', PayTypeSchema, 'payType_ds')