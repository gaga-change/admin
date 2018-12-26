const mongoose = require('mongoose')
const dictBaseSchema = require('../dictBaseSchema')
const {
    Schema
} = mongoose

const RegPointSchema = new Schema({
    price: {
        default: 0,
        type: Number
    }
},{
    timestamps: true
})
RegPointSchema.add(dictBaseSchema)

module.exports = mongoose.model('RegPoint', RegPointSchema, 'regPoint_ds')