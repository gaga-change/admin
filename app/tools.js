/**
 * 相关工具
 */

const svgCaptcha = require('svg-captcha')
const site = require('../config/site')

svgCaptcha.options.height = 38
module.exports = {
    /** 发送验证码图片，文本保存在session中 */
    async captcha(ctx, next) {
        var captch = svgCaptcha.create({color: true})
        ctx.session.captcha = captch.text.toLocaleLowerCase()
        ctx.type = 'svg'
        ctx.body = captch.data
    },
    /** 将相关参数绑定到 state 上 */
    async state(ctx, next) {
        ctx.state.user = ctx.session.user
        for(let key in site) { 
            ctx.state[key] = site[key]
        }
        return next()
    }
}