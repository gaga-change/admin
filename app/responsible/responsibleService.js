const Responsible = require('./responsibleSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: Responsible,
    ...baseService
}