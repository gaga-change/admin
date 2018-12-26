const mongoose = require('mongoose')
const dictBaseSchema = require('../dictBaseSchema')
const {
    Schema
} = mongoose

const ReferrerSchema = new Schema({
},{
    timestamps: true
})
ReferrerSchema.add(dictBaseSchema)

module.exports = mongoose.model('Referrer', ReferrerSchema, 'referrer_ds')