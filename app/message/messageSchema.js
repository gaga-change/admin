const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const MessageSchema = new Schema({
    content: {
        default: '',
        type: String
    },
    admin: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

MessageSchema.statics = {
    findAll({
        page = 1,
        pageSize = 20,
        select = '',
        criteria = {}
    } = {}) {
        pageSize = Math.min(30, pageSize)
        return Promise.all([
            this.find(criteria)
            .select(select)
            .sort({
                createdAt: -1
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize),
            this.countDocuments(criteria)
        ]).then(res => {
            return {
                data: res[0],
                page: {
                    count: res[1],
                    page,
                    pageSize
                }
            }
        })
    }
}

module.exports = mongoose.model('Message', MessageSchema, 'message_ds')