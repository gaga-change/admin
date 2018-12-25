const only = require('only')
const userService = require('./userService')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
// 用户类型
const TYPE = {
    SUPER: 'super',
    ADMIN: 'admin'
}
// 默认密码
const DEFAULT_PASSWORD = '123456'

module.exports = function (router) {
    // 管理员列表 - 页面
    router.get('/user/adminList.html', tools.super, async ctx => {
        await ctx.render('user/adminList', ctx.state)
    })
    // 管理员表单 - 页面
    router.get('/user/adminForm.html', tools.super, async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.userData = await userService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.userData = {}
        }
        await ctx.render('user/adminForm', ctx.state)
    })
    // 管理员列表 - 接口
    router.get('/api/admins', tools.super, async ctx => {
        let object = ctx.query
        for (let key in object) {
            if (!object[key]) delete object[key]
        }
        object.type = TYPE.ADMIN
        ctx.body = await userService.list(ctx, object, new Page(ctx.query))
    })
    // 增加管理员 - 接口
    router.post(`/api/admins`, tools.super, async ctx => {
        const {
            body
        } = ctx.request
        let object = body
        object.password = DEFAULT_PASSWORD
        object.type = TYPE.ADMIN
        ctx.body = await userService.add(ctx, object)
    })
    // 删除管理员 - 接口
    router.delete(`/api/admins/:objectId`, tools.super, async ctx => {
        const objectId = ctx.params.objectId
        let object = {
            _id: objectId
        }
        ctx.body = await userService.del(ctx, object)
    })
    // 删除多个管理员 - 接口
    router.delete(`/api/admins`, tools.super, async ctx => {
        let ids = ctx.query.ids
        ids = ids.split(`,`)
        ctx.body = await userService.delMore(ctx, ids)
    })
    // 修改管理员 - 接口
    router.put(`/api/admins/:objectId`, tools.super, async ctx => {
        const {
            body
        } = ctx.request
        let object = only(body, 'username remark status password')
        if (object.password === '') delete object.password
        object.type = TYPE.ADMIN
        object._id = ctx.params.objectId
        ctx.body = await userService.save(ctx, object)
    })
}