const PayType = require('./payTypeSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: PayType,
    ...baseService
}