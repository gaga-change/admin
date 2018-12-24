const mongoose = require('mongoose')
const dictBaseSchema = require('../tools/dictBaseSchema')
const {
    Schema
} = mongoose

const ClassTypeSchema = new Schema({
    price: {
        default: 0,
        type: Number
    }
},{
    timestamps: true
})
ClassTypeSchema.add(dictBaseSchema)

module.exports = mongoose.model('ClassType', ClassTypeSchema, 'classType_ds')