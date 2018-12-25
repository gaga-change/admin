const User = require('./userSchema')
const code = require('../code')
const baseService = require('../tools/baseService')

module.exports = {
    DB: User,
    ...baseService,
    /** 注册超级管理员 */
    async registerSuper(ctx, user) {
        const userCount = await User.count()
        ctx.assert(!userCount, code.Unauthorized, '无权操作')
        user = new User(user)
        user.status = true
        user.setSuper()
        return await user.save()
    },
    /** 增加 */
    async add(ctx, object) {
        const findUser = await this.DB.findOne({username: object.username})
        ctx.assert(!findUser, code.BadRequest, '用户名已存在')
        object = new this.DB(object)
        return await object.save()
    },
    /** 保存 (支持修改密码) */
    async save(ctx, object) {
        let user = await this.DB.findById(object._id)
        for(let key in object) {
            user[key] = object[key]
        }
        return await user.save()
    },
    /** 登录 */
    async login (ctx, user) {
        const findUser = await User.findOne({ username: user.username })
        ctx.assert(findUser, code.Unauthorized, '用户不存在')
        ctx.assert(findUser.status, code.Unauthorized, '当前账户未启用，请联系管理员！')
        ctx.assert(
            findUser.authenticate(user.password),
            code.Unauthorized, '密码错误'
        )
        ctx.session.user = findUser
        return findUser
    }
}