const mongoose = require('mongoose')
const dictBaseSchema = require('../tools/dictBaseSchema')
const {
    Schema
} = mongoose

const RegPointSchema = new Schema({
    price: {
        type: Number
    }
},{
    timestamps: true
})
RegPointSchema.add(dictBaseSchema)

module.exports = mongoose.model('RegPoint', RegPointSchema, 'regPoint_ds')