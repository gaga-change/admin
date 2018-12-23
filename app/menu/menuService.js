const Menu = require('./menuSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: Menu,
    ...baseService
}