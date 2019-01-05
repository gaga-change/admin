const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const CarTrainerSchema = new Schema({
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