const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const roleService = require('./roleService')
const baseController = require('../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/role/roleList.html', async ctx => {
        await ctx.render('role/roleList', ctx.state)
    })
    // 表单 - 页面
    router.get('/role/roleForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.role = await roleService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.role = {}
        }
        await ctx.render('role/roleForm', ctx.state)
    })
    baseController(router, roleService, 'roles')
}