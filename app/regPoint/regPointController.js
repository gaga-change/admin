const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const regPointService = require('./regPointService')
const baseController = require('../tools/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/regPoint/regPointList.html', async ctx => {
        await ctx.render('regPoint/regPointList', ctx.state)
    })
    // 表单 - 页面
    router.get('/regPoint/regPointForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.regPoint = await regPointService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.regPoint = {}
        }
        await ctx.render('regPoint/regPointForm', ctx.state)
    })
    baseController(router, regPointService, 'regPoints')
}