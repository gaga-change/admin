
const payTypeService = require('./payTypeService')
const baseController = require('../../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/payType/payTypeList.html', async ctx => {
        await ctx.render('payType/payTypeList', ctx.state)
    })
    // 表单 - 页面
    router.get('/payType/payTypeForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.payType = await payTypeService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.payType = {}
        }
        await ctx.render('payType/payTypeForm', ctx.state)
    })
    baseController(router, payTypeService, 'payTypes')
}