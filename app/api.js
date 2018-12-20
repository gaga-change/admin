/**
 * 路由
 */

const router = require('koa-router')()
const tools = require('./tools')
const home = require('./home/homeController')

router.use(tools.state)
home(router)

module.exports = router.routes()