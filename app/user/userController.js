const only = require('only')
const userService = require('./userService')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const baseController = require('../tools/baseController')

module.exports = function (router) {
    // 注册 - 页面
    router.get('/user/register.html', async (ctx, next) => {
        await ctx.render('user/register', ctx.state)
    })
    // 登录 - 页面
    router.get('/user/login.html', async (ctx, next) => {
        await ctx.render('user/login', ctx.state)
    })
    // 登录 - 接口
    router.post('/api/users/login', async ctx => {
        const {
            body
        } = ctx.request
        ctx.assert(body.captcha && ctx.session.captcha == body.captcha.toLocaleLowerCase(), code.Unauthorized, '验证码错误')
        let user = only(body, 'username password')
        ctx.body = await userService.login(ctx, user)
    })
    // 注册 - 接口 (特殊，不开放，只作为初始注册超级管理员用)
    router.post('/api/users/register', async ctx => {
        const {
            body
        } = ctx.request
        ctx.assert(body.captcha && ctx.session.captcha == body.captcha.toLocaleLowerCase(), code.Unauthorized, '验证码错误')
        let user = only(body, 'username password')
        ctx.body = await userService.registerSuper(ctx, user)
    })
    // 退出登录 - 接口
    router.get('/api/users/logout', async ctx => {
        ctx.session = null
        ctx.body = ''
    })
    // 列表 - 页面
    router.get('/user/userList.html', async ctx => {
        await ctx.render('user/userList', ctx.state)
    })
    // 表单 - 页面
    router.get('/user/userForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.userData = await userService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.userData = {}
        }
        await ctx.render('user/userForm', ctx.state)
    })

    baseController(router, userService, 'users')
}