const only = require('only')
const userService = require('./userService')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const baseController = require('../base/baseController')

// 默认密码
const DEFAULT_PASSWORD = '123456'

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
    // 列表 - 接口
    router.get(`/api/users`, tools.checkAuth2, async ctx => {
        let object = ctx.query
        for (let key in object) {
            if (!object[key]) delete object[key]
        }
        ctx.body = await userService.list(ctx, object, new Page(ctx.query))
    })
    // 列表(单) - 接口
    router.get(`/api/users/:objectId`, tools.checkAuth2, async ctx => {
        const objectId = ctx.params.objectId
        let object = ctx.query
        object._id = objectId
        ctx.body = await userService.list(ctx, object)
    })
    // 增加（子用户） - 接口
    router.post(`/api/users`, tools.checkAuth2, async ctx => {
        const {
            body
        } = ctx.request
        let object = body
        object.password = DEFAULT_PASSWORD // 附加默认密码
        ctx.body = await userService.add(ctx, object)
    })
    // 删除 - 接口
    router.delete(`/api/users/:objectId`, tools.checkAuth2, async ctx => {
        const objectId = ctx.params.objectId
        let object = {
            _id: objectId
        }
        ctx.body = await userService.del(ctx, object)
    })
    // 删除多个 - 接口
    router.delete(`/api/users`, tools.checkAuth2, async ctx => {
        let ids = ctx.query.ids
        ids = ids.split(`,`)
        ctx.body = await userService.delMore(ctx, ids)
    })
    // 修改 - 接口
    router.put(`/api/users/:objectId`, tools.checkAuth2, async ctx => {
        const {
            body
        } = ctx.request
        let object = only(body, 'username remark status password area')
        if (object.password === '') delete object.password
        object._id = ctx.params.objectId
        ctx.body = await userService.save(ctx, object)
    })
}