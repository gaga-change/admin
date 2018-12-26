
const responsibleService = require('./responsibleService')
const baseController = require('../../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/responsible/responsibleList.html', async ctx => {
        await ctx.render('responsible/responsibleList', ctx.state)
    })
    // 表单 - 页面
    router.get('/responsible/responsibleForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.responsible = await responsibleService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.responsible = {}
        }
        await ctx.render('responsible/responsibleForm', ctx.state)
    })
    baseController(router, responsibleService, 'responsibles')
}