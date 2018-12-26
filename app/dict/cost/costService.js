const Cost = require('./costSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: Cost,
    ...baseService
}