const ClassType = require('./classTypeSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: ClassType,
    ...baseService
}