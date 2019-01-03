
const code = require('../code')

module.exports = {
    /** 页面登入校验。未登录跳转到登录页面 */
    async checkAuth(ctx, next) {
        if (ctx.session.user) {
            return next()
        } else {
            return ctx.response.redirect('/user/login.html')
        }
    },
    /** 页面登入校验 (接口) */
    async checkAuth2(ctx, next) {
        ctx.assert(ctx.session.user, code.Forbidden, 'GO_LOGIN')
        return next()
    },
    /** 校验是否为超级管理员操作 针对页面 */
    async super(ctx, next) {
        if (ctx.session.user && ctx.session.user.type == 'super') {
            return next()
        } else {
            return ctx.response.redirect('/user/login.html')
        }
    },
    /** 校验是否为超级管理员操作 针对接口 */
    async super2(ctx, next) {
        if (ctx.session.user && ctx.session.user.type == 'super') {
            return next()
        } else {
            return ctx.response.redirect('/user/login.html')
        }
    }
}