/**
 * 主页相关
 */

const tools = require('../tools')

module.exports = function (router) {
    router.get('/', tools.checkAuth, async (ctx, next) => {
        await ctx.render('index', ctx.state)
    })
}