/**
 * 路由
 */

const router = require('koa-router')()
const site = require('../config/site')
const auto = require('./auto')
const homeController = require('./home/homeController')
const userController = require('./user/userController')
const toolsController = require('./tools/toolsController')
const costController = require('./cost/costController')
const referrerController = require('./referrer/referrerController')
const regPointController = require('./regPoint/regPointController')
const classTypeController = require('./classType/classTypeController')
const campusController = require('./campus/campusController')
const payTypeController = require('./payType/payTypeController')
const responsibleController = require('./responsible/responsibleController')
const messageController = require('./message/messageController')
const menuController = require('./menu/menuController')

// 绑定 用户&site配置项 到state中
router.use(async (ctx, next) => {
    ctx.state.user = ctx.session.user
    for (let key in site) {
        ctx.state[key] = site[key]
    }
    return next()
})

homeController(router, auto)
userController(router, auto)
toolsController(router, auto)
costController(router, auto)
referrerController(router, auto)
regPointController(router, auto)
classTypeController(router, auto)
campusController(router, auto)
payTypeController(router, auto)
responsibleController(router, auto)
messageController(router, auto)
menuController(router, auto)

module.exports = router.routes()