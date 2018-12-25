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
        let findMenu = await this.DB.findOne({
            sign
        })
        ctx.assert(!findMenu, code.BadRequest, '标识已存在')
        object = new this.DB(object)
        if (parentSign) {
            let parent = await this.DB.findOne({
                sign: parentSign
            })
            ctx.assert(parent, code.BadRequest, '父级标识不存在')
            object.parent = parent
            object.tier = parent.tier + 1
        }
        return await object.save()
    },
    /** 修改 */
    async modify(ctx, object) {
        const parentSign = object.parentSign
        if (parentSign) {
            let parent = await this.DB.findOne({
                sign: parentSign
            })
            ctx.assert(parent, code.BadRequest, '父级标识不存在')
            object.parent = parent
            object.tier = parent.tier + 1
        } else {
            object.parent = null
            object.tier = 0
        }
        return await this.DB.updateOne({
            _id: object._id
        }, object)
    },
    /** 查询主页菜单 */
    async homeMenu(ctx) {
        let list = await this.DB.find({
            type: 'page',
            show: true
        }).sort({
            tier: 1,
            order: -1
        }).populate('parent')
        let menuTree = []
        // 把列表转为树型结构 {[sign]: {..., son: {[sign]: {..., son: []}}}}
        list.forEach(item => {
            let {
                sign,
                tier,
                parent,
                url
            } = item
            let parentSign = parent && parent.sign
            let tree = menuTree[tier]
            if (!tree) {
                tree = {}
                menuTree[tier] = tree
            }
            tree[sign] = item
            // 有父级。 拿到父级 tree，往其son列表中添加
            if (tier && parentSign) {
                let faTree = menuTree[tier - 1]
                let sonList = faTree[parentSign].son
                if (sonList) {
                    sonList.push(item)
                } else {
                    sonList = [item]
                    faTree[parentSign].son = sonList
                }
            }
        })
        return menuTree[0]
    },
    /** 查询 */
    async list(ctx, object, page) {
        if (page) {
            let criteria = {}
            this.DB.schema.eachPath(function (path) {
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