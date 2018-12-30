const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const RoleSchema = new Schema({
    remark: {
        default: '',
        type: String
    },
    name: {
        default: '',
        type: String
    },
    authority: {
        default: [],
        type: Array
    }
}, {
    timestamps: true
})

RoleSchema.statics = {
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

module.exports = mongoose.model('Role', RoleSchema, 'role_ds')