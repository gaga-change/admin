const Cost = require('./costSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: Cost,
    ...baseService
}