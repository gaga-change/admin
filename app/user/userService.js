const User = require('./userSchema')
const code = require('../code')

module.exports = {
    /** 注册超级管理员 */
    async registerSuper(ctx, user) {
        const userCount = await User.count()
        console.log(userCount, !userCount)
        ctx.assert(userCount == 0, code.Unauthorized, '无权操作')
        user = new User(user)
        user.setSuper()
        return await user.save()
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