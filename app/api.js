/**
 * 路由
 */
const path = require('path')
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
const adminController = require('./user/adminController')

// 绑定 用户&site配置项 到state中
router.use(async (ctx, next) => {
    let user = ctx.session.user
    ctx.state.user = user
    ctx.state.admin = '' // 用户归属管理员id
    ctx.state.area = ctx.host.substring(0, ctx.host.indexOf('.')) || '' // 子域名
    if (user && user.type) {
        ctx.state.admin = user._id
    }
    for (let key in site) {
        ctx.state[key] = site[key]
    }
    return next()
})

const myRouter = {
    get(...args) {
        this._(args, 'get')
    },
    post(...args) {
        this._(args, 'post')
    },
    delete(...args) {
        this._(args, 'delete')
    },
    put(...args) {
        this._(args, 'put')
    },
    page(...args) {
        this._(args, 'get', 'page')
    },
    _(args, method, isPage) {
        let opt = args.shift()
        // 如果第一个参数传的为字符串， 则进行解析
        if (typeof opt == 'string') {
            // 获取 url后缀
            const extname = path.extname(opt)
            opt = {
                sign: opt,
                url: opt
            }
            // 如果后缀为 .html 则类型为 'page'
            if (extname == '.html' || isPage) {
                opt.type = 'page'
            } else {
                opt.sign = method + ':' + opt.sign 
            }
        }
        args.unshift(opt.url, auto(opt))
        router[method](...args)
    }
}

homeController(myRouter)
userController(myRouter)
toolsController(myRouter)
costController(myRouter)
referrerController(myRouter)
regPointController(myRouter)
classTypeController(myRouter)
campusController(myRouter)
payTypeController(myRouter)
responsibleController(myRouter)
messageController(myRouter)
menuController(myRouter)
adminController(myRouter)

module.exports = router.routes()