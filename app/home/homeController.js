/**
 * 主页相关
 */

const tools = require('../tools')

module.exports = function (router) {
    router.get(['/', '/index.html'], tools.checkAuth, async (ctx, next) => {
        await ctx.render('index', ctx.state)
    })
}