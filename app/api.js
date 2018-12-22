/**
 * 路由
 */

const router = require('koa-router')()
const site = require('../config/site')
const homeController = require('./home/homeController')
const userController = require('./user/userController')
const toolsController = require('./tools/toolsController')

// 绑定 用户&site配置项 到state中
router.use(async (ctx, next) => {
    ctx.state.user = ctx.session.user
    for (let key in site) {
        ctx.state[key] = site[key]
    }
    return next()
})
homeController(router)
userController(router)
toolsController(router)


module.exports = router.routes()