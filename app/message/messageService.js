const Message = require('./messageSchema')
const baseService = require('../tools/baseService')

module.exports = {
    DB: Message,
    ...baseService
}