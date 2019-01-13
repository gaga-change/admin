const only = require('only')
const code = require('../code')
const tools = require('../tools')
const Page = require('../tools/Page')
const carStudentService = require('./carStudentService')
const baseController = require('../base/baseController')
module.exports = router => {
    // 列表 - 页面
    router.get('/carStudent/carStudentList.html', async ctx => {
        await ctx.render('carStudent/carStudentList', ctx.state)
    })
    // 列表 - 页面
    router.get('/carStudent/carStudentStateList.html', async ctx => {
        await ctx.render('carStudent/carStudentStateList', ctx.state)
    })
    // 表单 - 页面
    router.get('/carStudent/carStudentForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.carStudent = await carStudentService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.carStudent = {}
        }
        await ctx.render('carStudent/carStudentForm', ctx.state)
    })
    // 表单 - 页面
    router.get('/carStudent/carStudentStateForm.html', async ctx => {
        let id = ctx.query.id
        if (id) {
            ctx.state.carStudent = await carStudentService.list(ctx, {
                _id: id
            })
        } else {
            ctx.state.carStudent = {}
        }
        await ctx.render('carStudent/carStudentStateForm', ctx.state)
    })
    // 缴费 编辑&添加 - 页面
    router.get('/carStudent/carStudentCostForm.html', async ctx => {
        let id = ctx.query.id
        let carStudentId = ctx.query.carStudentId
        if (id) {
            ctx.state.carStudent = await carStudentService.findCostOne(ctx, {
                id,
                carStudentId
            })
            ctx.state.carStudent.id = ctx.state.carStudent._id.toString()
            ctx.state.carStudent.costList.id = ctx.state.carStudent.costList._id.toString()
        } else {
            ctx.state.carStudent = {
                ...ctx.query,
                costList: {}
            }
        }
        await ctx.render('carStudent/carStudentCostForm', ctx.state)
    })
    // 缴费 列表 - 页面
    router.get('/carStudent/carStudentCostList.html', async ctx => {
        await ctx.render('carStudent/carStudentCostList', ctx.state)
    })
    // 添加缴费
    // router.post('/api/carStudents/:carStudentId/costs', async ctx => {
    //     let {body} = ctx.request
    //     return await carStudentService.addCost(ctx, body)
    // })
    router.post('/api/carStudents/costs', tools.checkAuth2, async ctx => {
        let {
            body
        } = ctx.request
        ctx.assert(body.name && body.card && body.cost, code.BadRequest, '参数异常')
        ctx.body = await carStudentService.addCost(ctx, body)
    })
    // 删除缴费
    router.delete('/api/carStudents/:carStudentId/costs/:costId', async ctx => {

    })
    // 修改缴费
    router.put('/api/carStudents/:carStudentId/costs/:costId', async ctx => {
        let {
            body
        } = ctx.request
        ctx.body = await carStudentService.putCost(ctx, body)
    })
    // 查询缴费
    router.get('/api/carStudents/costs', async ctx => {
        ctx.body = await carStudentService.findCost(ctx, ctx.query)
    })
    baseController(router, carStudentService, 'carStudents')
}