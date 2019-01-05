const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const CarTrainerSchema = new Schema({
    // 姓名
    name: {
        default: '',
        type: String
    },
    // 身份证
    card: {
        default: '',
        type: String
    },
    // 手机号
    phone: {
        default: '',
        type: String
    },
    // 性别
    sex: {
        default: '',
        type: String
    },
    // 培训科目
    subjects: {
        default: [],
        type: Array
    },
    // 车型
    carTypes: {
        default: [],
        type: Array
    },
    // 是否启用
    status: {
        default: false,
        type: Boolean
    },
    admin: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

CarTrainerSchema.statics = {
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

module.exports = mongoose.model('CarTrainer', CarTrainerSchema, 'carTrainer_ds')