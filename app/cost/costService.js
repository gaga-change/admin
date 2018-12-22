const Cost = require('./costSchema')

module.exports = {
    /** 增加 */
    async add(ctx, cost) {
        cost = new Cost(cost)
        return await cost.save()
    },
    /** 删除 */
    async del(ctx, cost) {
        return await Cost.remove({
            _id: cost._id
        })
    },
    /** 批量删除 */
    async delMore(ctx, ids) {
        return await Cost.remove({_id: {$in: ids}})
    },
    /** 修改 */
    async modify(ctx, cost) {        
        return await Cost.updateOne({_id: cost._id}, cost)
    },
    /** 查询 */
    async list(ctx, cost, page) {
        if (page)
            return await Cost.findAll({
                page: page.page,
                pageSize: page.pageSize,
                select: '',
                criteria: cost
            })
        else {
            return await Cost.findById(cost._id)
        }
    }
}