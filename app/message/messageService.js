const Message = require('./messageSchema')
const baseService = require('../base/baseService')

module.exports = {
    DB: Message,
    ...baseService
}