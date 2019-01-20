const only = require('only')
const mongoose = require('mongoose')
const CarStudent = require('./carStudentSchema')
const baseService = require('../base/baseService')
const Page = require('../tools/Page')
const code = require('../code')

module.exports = {
    DB: CarStudent,
    ...baseService,
    /** 增加 */
    async add(ctx, object) {
        let trainer = await this.DB.findOne({
            name: object.name
        })
        ctx.assert(!trainer, code.BadRequest, '该姓名已存在，请尝试姓名后面添加数字。<br/>如：张三1')
        object = new this.DB(object)
        object.admin = ctx.state.admin
        return await object.save()
    },
    /** 修改 */
    async modify(ctx, object) {
        if (object.name) {
            let trainer = await this.DB.findOne({
                _id: {
                    $ne: object._id
                },
                name: object.name
            })
            ctx.assert(!trainer, code.BadRequest, '该姓名已存在，请尝试姓名后面添加数字。<br/>如：张三1')
        }
        delete object.admin
        return await this.DB.updateOne({
            _id: object._id
        }, object)
    },
    /** 添加缴费 */
    async addCost(ctx, object) {
        const carStudent = await CarStudent.findOne({
            name: object.name,
            card: object.card
        })
        ctx.assert(carStudent, code.BadRequest, `学员【${object.name}】不存在`)
        const cost = only(object.cost, 'name payDate price remark state')
        cost._id = new mongoose.Types.ObjectId
        carStudent.costList.push(cost)
        return await carStudent.save()
    },
    /** 缴费查询 */
    async findCost(ctx, object) {
        const page = new Page(object)

        let criteria = {
            admin: new mongoose.
            Types.ObjectId(ctx.state.admin._id)
        }
        if (object.carStudentName) criteria['name'] = object.carStudentName

        let res = await Promise.all([this.DB.aggregate([{
                $match: criteria
            }]).unwind('costList').sort('-createdAt').project({
                _id: '$costList._id',
                name: '$costList.name',
                price: '$costList.price',
                state: '$costList.state',
                payDate: '$costList.payDate',
                remark: '$costList.remark',
                carStudentName: '$name',
                carStudentCard: '$card',
                carStudentId: '$_id'
            }).limit(page.pageSize)
            .skip((page.page - 1) * page.pageSize),
            this.DB.aggregate([{
                $match: criteria
            }, {
                $unwind: '$costList'
            }, {
                $count: "count"
            }])
        ])
        return {
            data: res[0],
            page: {
                count: res[1].length ? res[1][0].count : 0,
                page: page.page,
                pageSize: page.pageSize
            }
        }
    },
    /** 查询单条记录 */
    async findCostOne(ctx, object) {
        const res = await this.DB.aggregate([{
                $match: {
                    admin: new mongoose.
                    Types.ObjectId(ctx.state.admin._id),
                    _id: new mongoose.
                    Types.ObjectId(object.carStudentId)
                }
            }, {
                $unwind: '$costList'
            }, {
                $match: {
                    'costList._id': new mongoose.
                    Types.ObjectId(object.id)
                }
            }

        ])
        return res[0] || null
    },
    /** 修改缴费 */
    async putCost(ctx, object) {
        const {
            carStudentId,
            costId
        } = ctx.params
        const update = {}

        for (const key in object) {
            update[`costList.$.${key}`] = object[key]
        }
        // 修改参数
        return await this.DB.updateOne({
            '_id': carStudentId,
            'admin': ctx.state.admin,
            'costList._id': costId
        }, update)
    },
    /** 删除缴费 */
    async delCost(ctx) {
        const {
            carStudentId,
            costId
        } = ctx.params

        return await this.DB.updateOne({
            '_id': carStudentId,
            'admin': ctx.state.admin
        }, {
            $pull: {costList: {_id: costId}}
        })
    },
}