const Role = require('./roleSchema')
const baseService = require('../base/baseService')

module.exports = {
    DB: Role,
    ...baseService
}