const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const costService = require('./costService')

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
    // 列表 - 接口
    router.get('/api/costs', async ctx => {
        let cost = only(ctx.query, 'name price status remark')
        for(let key in cost) {
            if(!cost[key]) delete cost[key]       
        }
        ctx.body = await costService.list(ctx, cost, new Page(ctx.query))
    })
    // 列表(单) - 接口
    router.get('/api/costs/:costId', async ctx => {
        const costId = ctx.params.costId
        let cost = only(ctx.query, 'name price status remark')
        cost._id = costId
        ctx.body = await costService.list(ctx, cost)
    })
    // 增加 - 接口
    router.post('/api/costs', async ctx => {
        const {
            body
        } = ctx.request
        let cost = only(body, 'name price status remark')
        ctx.body = await costService.add(ctx, cost)
    })
    // 删除 - 接口
    router.delete('/api/costs/:costId', async ctx => {
        const costId = ctx.params.costId
        let cost = {
            _id: costId
        }
        ctx.body = await costService.del(ctx, cost)
    })
    // 删除多个 - 接口
    router.delete('/api/costs', async ctx => {
        let ids = ctx.query.ids
        ids = ids.split(',')
        ctx.body = await costService.delMore(ctx, ids)
    })
    // 修改 - 接口
    router.put('/api/costs/:costId', async ctx => {
        const {
            body
        } = ctx.request
        let cost = only(body, 'name price status remark')
        cost._id = ctx.params.costId
        ctx.body = await costService.modify(ctx, cost)
    })
}