const ClassType = require('./classTypeSchema')
const baseService = require('../../base/baseService')

module.exports = {
    DB: ClassType,
    ...baseService
}