const mongoose = require('mongoose')
const dictBaseSchema = require('../dictBaseSchema')
const {
    Schema
} = mongoose

const CampusSchema = new Schema({
},{
    timestamps: true
})
CampusSchema.add(dictBaseSchema)

module.exports = mongoose.model('Campus', CampusSchema, 'campus_ds')