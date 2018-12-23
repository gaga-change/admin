const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const menuService = require('./menuService')
const baseController = require('../tools/baseController')
module.exports = (router, auto) => {
    let opt = {
        sign: 'menu-list',
        type: 'page',
        url: '/menu/menuList.html'
    }
    // 列表 - 页面
    router.get(opt.url, auto(opt), async ctx => {
        await ctx.render('menu/menuList', ctx.state)
    })
    opt = {
        sign: 'menu-form',
        type: 'page',
        url: '/menu/menuForm.html'
    }
    // 表单 - 页面
    router.get(opt.url, auto(opt), async ctx => {
        let {
            id,
            parentId
        } = ctx.query
        if (id) { // 编辑
            ctx.state.menu = await menuService.list(ctx, {
                _id: id
            })
        } else if (parentId) { // 添加子菜单
            ctx.state.menu = {
                parent: await menuService.list(ctx, {
                    _id: parentId
                })
            }
            console.log(ctx.state.menu)
        } else { // 添加一级
            ctx.state.menu = {}
        }
        await ctx.render('menu/menuForm', ctx.state)
    })
    baseController(router, menuService, 'menus')
}