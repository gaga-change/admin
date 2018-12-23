/**
 * 主页相关
 */

const tools = require('../tools')

module.exports = function (router, auto) {
    let opt = {
        sign: 'home',
        type: 'page',
        url: '/'
    }
    router.get(opt.url, tools.checkAuth, auto(opt), async (ctx, next) => {
        await ctx.render('index', ctx.state)
    })
}