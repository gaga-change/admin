/**
 * 主页相关
 */

const tools = require('../tools')

module.exports = function (router, auto) {
    router.page('/', tools.checkAuth, async (ctx, next) => {
        await ctx.render('index', ctx.state)
    })
}