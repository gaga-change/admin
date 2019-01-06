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
    baseController(router, carStudentService, 'carStudents')
}