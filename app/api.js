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

// 绑定 用户&site配置项 到state中
router.use(async (ctx, next) => {
    ctx.state.user = ctx.session.user
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
    _(args, method, menuType) {
        let opt = args.shift()
        if (typeof opt == 'string') {
            const extname = path.extname(opt)
            opt = {
                sign: opt,
                url: opt
            }
            if (extname == '.html' || menuType) {
                opt.type = 'page'
            }
        }
        console.log(opt)
        args.unshift(opt.url, auto(opt))
        router[method](...args)
    },
    page(...args) {
        this._(args, 'get', 'page')
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

module.exports = router.routes()