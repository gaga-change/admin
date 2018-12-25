/**
 * 主页相关
 */

const tools = require('../tools')
const menuService = require('../menu/menuService')

module.exports = function (router, auto) {
    router.page('/', tools.checkAuth, async (ctx, next) => {
        let menuTree = await menuService.homeMenu(ctx)
        ctx.state.menuTree = menuTree
        await ctx.render('index', ctx.state)
    })
}