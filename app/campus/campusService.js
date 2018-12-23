const Campus = require('./campusSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: Campus,
    ...baseService
}