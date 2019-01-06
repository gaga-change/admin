/**
 * 主页。以及公共相关
 */

const svgCaptcha = require('svg-captcha')
const tools = require('../tools')
const menuService = require('../menu/menuService')

svgCaptcha.options.height = 38
module.exports = function (router, auto) {
    router.page('/', tools.checkAuth, async (ctx, next) => {
        let menuTree = await menuService.homeMenu(ctx)
        ctx.state.menuTree = menuTree
        await ctx.render('index', ctx.state)
    })
    router.get('/tools/captcha', async ctx => {
        const captch = svgCaptcha.create({color: true})
        ctx.session.captcha = captch.text.toLocaleLowerCase()
        ctx.type = 'svg'
        ctx.body = captch.data
    })
    router.get('/tpl/system/about.html', async ctx => {
        await ctx.render('about', ctx.state)
    })
}