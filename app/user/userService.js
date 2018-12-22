const User = require('./userSchema')
const code = require('../code')

module.exports = {
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
        ctx.assert(findUser, code.Unauthorized, '邮箱不存在')
        ctx.assert(
            findUser.authenticate(user.password),
            code.Unauthorized, '密码错误'
        )
        ctx.session.user = findUser
        return findUser
    },
    /**
     * 增加用户
     */
    async add(user) {
        return await user.save()
    },
    /**
     * 删除用户
     */
    async del(user) {
        return await user.remove()
    },
    /**
     * 修改用户
     */
    async modify(user) {
        return await user.save()
    }
}