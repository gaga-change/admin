const Menu = require('./menuSchema')
const baseService = require('../tools/baseService')
const code = require('../code')

module.exports = {
    DB: Menu,
    ...baseService,
    /** 增加 */
    async add(ctx, object) {
        const parentSign = object.parentSign
        const sign = object.sign
        let findMenu = await this.DB.findOne({sign})
        console.log(findMenu)
        ctx.assert(!findMenu, code.BadRequest, '标识已存在')
        object = new this.DB(object)
        if (parentSign) {
            let parent = await this.DB.findOne({sign: parentSign})
            ctx.assert(parent, code.BadRequest, '父级标识不存在')
            object.parent = parent
        }
        return await object.save()
    },
    /** 修改 */
    async modify(ctx, object) {
        return await this.DB.updateOne({
            _id: object._id
        }, object)
    },
    /** 查询 */
    async list(ctx, object, page) {
        if (page) {
            let criteria = {}
            this.DB.schema.eachPath(function(path) {
                if (object[path]) criteria[path] = object[path]
            })
            return await this.DB.findAll({
                page: page.page,
                pageSize: page.pageSize,
                select: '',
                criteria
            })
        } else {
            return await this.DB.findById(object._id).populate('parent')
        }
    }
}