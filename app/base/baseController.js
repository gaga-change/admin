const only = require('only')
const Page = require('../tools/Page')
const tools = require('../tools/index')

/**
 * 资源增删该查接口。 默认附加 是否登录校验
 */
module.exports = (router, service, name, ...other) => {
    // 列表 - 接口
    router.get(`/api/${name}`, tools.checkAuth2, ...other, async ctx => {
        let object = ctx.query
        for (let key in object) {
            if (!object[key]) delete object[key]
        }
        ctx.body = await service.list(ctx, object, new Page(ctx.query))
    })
    // 列表(单) - 接口
    router.get(`/api/${name}/:objectId`, tools.checkAuth2, ...other, async ctx => {
        const objectId = ctx.params.objectId
        let object = ctx.query
        object._id = objectId
        ctx.body = await service.list(ctx, object)
    })
    // 增加 - 接口
    router.post(`/api/${name}`, tools.checkAuth2, ...other, async ctx => {
        const {
            body
        } = ctx.request
        let object = body
        ctx.body = await service.add(ctx, object)
    })
    // 删除 - 接口
    router.delete(`/api/${name}/:objectId`, tools.checkAuth2, ...other, async ctx => {
        const objectId = ctx.params.objectId
        let object = {
            _id: objectId
        }
        ctx.body = await service.del(ctx, object)
    })
    // 删除多个 - 接口
    router.delete(`/api/${name}`, tools.checkAuth2, ...other, async ctx => {
        let ids = ctx.query.ids
        ids = ids.split(`,`)
        ctx.body = await service.delMore(ctx, ids)
    })
    // 修改 - 接口
    router.put(`/api/${name}/:objectId`, tools.checkAuth2, ...other, async ctx => {
        const {
            body
        } = ctx.request
        let object = body
        object._id = ctx.params.objectId
        ctx.body = await service.modify(ctx, object)
    })
}