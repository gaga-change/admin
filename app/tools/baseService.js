module.exports = {
    /** 增加 */
    async add(ctx, object) {
        object = new this.DB(object)
        return await object.save()
    },
    /** 删除 */
    async del(ctx, object) {
        return await this.DB.deleteOne({
            _id: object._id
        })
    },
    /** 批量删除 */
    async delMore(ctx, ids) {
        return await this.DB.deleteMany({
            _id: {
                $in: ids
            }
        })
    },
    /** 修改 */
    async modify(ctx, object) {
        return await this.DB.updateOne({
            _id: object._id
        }, object)
    },
    /** 查询 */
    async list(ctx, object, page) {
        if (page) {
            let criteria = {}
            this.DB.schema.eachPath(function(path) {
                if (object[path]) criteria[path] = object[path]
            })
            return await this.DB.findAll({
                page: page.page,
                pageSize: page.pageSize,
                select: '',
                criteria
            })
        } else {
            return await this.DB.findById(object._id)
        }
    }
}