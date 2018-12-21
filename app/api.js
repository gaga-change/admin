/**
 * 路由
 */

const router = require('koa-router')()
const tools = require('./tools')
const homeController = require('./home/homeController')
const userController = require('./user/userController')

router.use(tools.state)
homeController(router)
userController(router)

module.exports = router.routes()