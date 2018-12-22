const only = require('only')
const userService = require('./userService')
const code = require('../code')

module.exports = function(router) {
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

    })
    // 注册 - 接口 (特殊，不开放，只作为初始注册超级管理员用)
    router.post('/api/users/register', async ctx => {
        const { body } = ctx.request
        ctx.assert(body.captcha && ctx.session.captcha == body.captcha.toLocaleLowerCase(), code.Unauthorized, '验证码错误')
        body.name = body.username
        let user = only(body, 'name password')
        ctx.body = await userService.registerSuper(ctx, user)
    })
    // 查询所有用户 - 接口
    // 删除用户 - 接口
    // 修改 -  接口
    // 查询单用户 - 接口
}