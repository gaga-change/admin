const path = require('path')
const Koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session')
const staticCache = require('koa-static-cache')
const views = require('koa-views')
const {link: mongoConnectLink} = require('../config/mongo')
const api = require('./api')
const app = new Koa()

// MongoDB 连接
mongoose.connect(mongoConnectLink, {useNewUrlParser: true})
const db = mongoose.connection
// Session 配置参数
const CONFIG = {
    httpOnly: true,
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    renew: false,
    rolling: false,
    signed: true
}

// Session 配置
app.keys = ['junn secret 4']
// MongoDB 连接异常输出
db.on('error', console.error.bind(console, 'connection error:'))
// Body 解析
app.use(koaBody({jsonLimit: '10kb'}))
// Session 解析
app.use(session(CONFIG, app))
// 日志信息输出
app.use(logger())
// 静态资源
app.use(staticCache(path.resolve(__dirname, '../publish'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    dynamic: true
}))
// 模板引擎
app.use(views(path.resolve(__dirname, '../views'), {
    map: { html: 'swig' }
}))
// Api 接口
app.use(api)
app.use(async ctx => {
    ctx.status  = 404
    await ctx.render('error', ctx.state)
})
// 异常监听
app.on('error', (err) => {
    console.error(err)
})

module.exports = app