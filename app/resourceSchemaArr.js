/**
 * 相关资源 公共资源 对应的 model
 */
const dictSchemaArr = require('./dict/dictSchemaArr')
module.exports = [
    ...dictSchemaArr,
    require('./message/messageSchema'),
    require('./user/userSchema')
]