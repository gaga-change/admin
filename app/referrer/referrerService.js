const Referrer = require('./referrerSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: Referrer,
    ...baseService
}