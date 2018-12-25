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
        user.setSuper()
        return await user.save()
    },
    /** 登录 */
    async login (ctx, user) {
        const findUser = await User.findOne({ username: user.username })
        ctx.assert(findUser, code.Unauthorized, '用户不存在')
        ctx.assert(
            findUser.authenticate(user.password),
            code.Unauthorized, '密码错误'
        )
        ctx.session.user = findUser
        return findUser
    }
}