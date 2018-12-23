/**
 * 路由
 */

const router = require('koa-router')()
const site = require('../config/site')
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
costController(router)
referrerController(router)
regPointController(router)
classTypeController(router)
campusController(router)
payTypeController(router)
responsibleController(router)
messageController(router)

module.exports = router.routes()