const dictSchemaArr = require('../dict/dictSchemaArr')
module.exports = [
    ...dictSchemaArr,
    require('../message/messageSchema'),
    require('../user/userSchema')
]