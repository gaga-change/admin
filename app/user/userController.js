const userService = require('./userService')

module.exports = function(router) {
    router.get('/user/register.html', async (ctx, next) => {
        await ctx.render('user/register', ctx.state)
    }),
    router.get('/user/login.html', async (ctx, next) => {
        await ctx.render('user/login', ctx.state)
    })
}