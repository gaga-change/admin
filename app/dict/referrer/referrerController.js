
const referrerService = require('./referrerService')
const baseController = require('../../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/referrer/referrerList.html', async ctx => {
        await ctx.render('referrer/referrerList', ctx.state)
    })
    // 表单 - 页面
    router.get('/referrer/referrerForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.referrer = await referrerService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.referrer = {}
        }
        await ctx.render('referrer/referrerForm', ctx.state)
    })
    baseController(router, referrerService, 'referrers')
}