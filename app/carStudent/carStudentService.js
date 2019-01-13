const only = require('only')
const mongoose = require('mongoose')
const CarStudent = require('./carStudentSchema')
const baseService = require('../base/baseService')
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
        let trainer = await this.DB.findOne({
            _id: {
                $ne: object._id
            },
            name: object.name
        })
        ctx.assert(!trainer, code.BadRequest, '该姓名已存在，请尝试姓名后面添加数字。<br/>如：张三1')
        delete object.admin
        return await this.DB.updateOne({
            _id: object._id
        }, object)
    },
    /** 添加缴费 */
    async addCost(ctx, object) {
        const carStudent = await CarStudent.findOne({name: object.name, card: object.card})
        ctx.assert(carStudent, code.BadRequest, `学员【${object.name}】不存在`)
        const cost = only(object.cost, 'name payDate price remark state')
        cost._id = new mongoose.Types.ObjectId
        carStudent.costList.push(cost)
        return await carStudent.save()
    }
}