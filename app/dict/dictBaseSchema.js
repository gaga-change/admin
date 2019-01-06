const mongoose = require('mongoose')

const {
    Schema
} = mongoose

const DictBaseSchema = new Schema({
    name: {
        default: '',
        type: String
    },
    status: {
        default: false,
        type: Boolean
    },
    remark: {
        default: '',
        type: String
    },
    admin: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
})

DictBaseSchema.statics = {
    findAll({
        page = 1,
        pageSize = 20,
        select = '',
        criteria = {}
    } = {}) {
        pageSize = Math.min(999, pageSize)
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

module.exports = DictBaseSchema