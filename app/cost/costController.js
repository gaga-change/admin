const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const costService = require('./costService')
const baseController = require('../tools/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/cost/costList.html', async ctx => {
        await ctx.render('cost/costList', ctx.state)
    })
    // 表单 - 页面
    router.get('/cost/costForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.cost = await costService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.cost = {}
        }
        await ctx.render('cost/costForm', ctx.state)
    })
    baseController(router, costService, 'costs')
}