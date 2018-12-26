const Referrer = require('./referrerSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: Referrer,
    ...baseService
}