const svgCaptcha = require('svg-captcha')

svgCaptcha.options.height = 38

module.exports = router => {
    router.get('/tools/captcha', async ctx => {
        const captch = svgCaptcha.create({color: true})
        ctx.session.captcha = captch.text.toLocaleLowerCase()
        ctx.type = 'svg'
        ctx.body = captch.data
    })
}