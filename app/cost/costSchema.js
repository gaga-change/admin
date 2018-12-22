const mongoose = require('mongoose')

const {
    Schema
} = mongoose

const CostSchema = new Schema({
    name: {
        default: '',
        type: String
    },
    price: {
        type: Number
    },
    status: {
        default: false,
        type: Boolean
    },
    remark: {
        default: '',
        type: String
    }
}, {
    timestamps: true
})

// CostSchema.pre('update', function (next) {
//     this.status = !!this.status
//     next();
// })

CostSchema.statics = {
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
                costs: res[0],
                page: {
                    count: res[1],
                    page,
                    pageSize
                }
            }
        })
    }
}

module.exports = mongoose.model('Cost', CostSchema, 'cost_ds')