const RegPoint = require('./regPointSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: RegPoint,
    ...baseService
}