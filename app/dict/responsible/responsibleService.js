const Responsible = require('./responsibleSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: Responsible,
    ...baseService
}