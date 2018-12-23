const mongoose = require('mongoose')
const dictBaseSchema = require('../tools/dictBaseSchema')
const {
    Schema
} = mongoose

const ResponsibleSchema = new Schema({
},{
    timestamps: true
})
ResponsibleSchema.add(dictBaseSchema)

module.exports = mongoose.model('Responsible', ResponsibleSchema, 'responsible_ds')