const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const messageService = require('./messageService')
const baseController = require('../tools/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/message/messageList.html', async ctx => {
        await ctx.render('message/messageList', ctx.state)
    })
    // 表单 - 页面
    router.get('/message/messageForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.message = await messageService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.message = {}
        }
        await ctx.render('message/messageForm', ctx.state)
    })
    baseController(router, messageService, 'messages')
}