const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const campusService = require('./campusService')
const baseController = require('../tools/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/campus/campusList.html', async ctx => {
        await ctx.render('campus/campusList', ctx.state)
    })
    // 表单 - 页面
    router.get('/campus/campusForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.campus = await campusService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.campus = {}
        }
        await ctx.render('campus/campusForm', ctx.state)
    })
    baseController(router, campusService, 'campuss')
}