const mongoose = require('mongoose')
const dictBaseSchema = require('../tools/dictBaseSchema')
const {
    Schema
} = mongoose

const CostSchema = new Schema({
    price: {
        type: Number
    }
},{
    timestamps: true
})
CostSchema.add(dictBaseSchema)

module.exports = mongoose.model('Cost', CostSchema, 'cost_ds')