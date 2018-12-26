const Campus = require('./campusSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: Campus,
    ...baseService
}