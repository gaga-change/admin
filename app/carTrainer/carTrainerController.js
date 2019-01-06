const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const carTrainerService = require('./carTrainerService')
const baseController = require('../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/carTrainer/carTrainerList.html', async ctx => {
        ctx.state.carTrainer = ctx.query
        await ctx.render('carTrainer/carTrainerList', ctx.state)
    })
    // 表单 - 页面
    router.get('/carTrainer/carTrainerForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.carTrainer = await carTrainerService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.carTrainer = {}
        }
        await ctx.render('carTrainer/carTrainerForm', ctx.state)
    })
    baseController(router, carTrainerService, 'carTrainers')
}