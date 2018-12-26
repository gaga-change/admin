const RegPoint = require('./regPointSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: RegPoint,
    ...baseService
}