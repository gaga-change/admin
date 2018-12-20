/**
 * 主页相关
 */

module.exports = function(router) {
    router.get(['/', '/index.html'], async (ctx, next) => {
        await ctx.render('index', ctx.state)
    })
}