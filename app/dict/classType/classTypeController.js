
const classTypeService = require('./classTypeService')
const baseController = require('../../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/classType/classTypeList.html', async ctx => {
        await ctx.render('classType/classTypeList', ctx.state)
    })
    // 表单 - 页面
    router.get('/classType/classTypeForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.classType = await classTypeService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.classType = {}
        }
        await ctx.render('classType/classTypeForm', ctx.state)
    })
    baseController(router, classTypeService, 'classTypes')
}