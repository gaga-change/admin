const PayType = require('./payTypeSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: PayType,
    ...baseService
}