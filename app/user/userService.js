const User = require('./userSchema')
const code = require('../code')
const baseService = require('../tools/baseService')
const resourceSchemaArr = require('../tools/resourceSchemaArr')

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
        object.admin = ctx.state.admin
        const findUser = await this.DB.findOne({
            username: object.username,
            $or: [{
                    admin: object.admin
                },
                {
                    area: ctx.state.area
                }
            ]
        })
        ctx.assert(!findUser, code.BadRequest, '用户名已存在')
        if (object.area) { // 域名不能相同
            const findUser = await this.DB.findOne({
                area: object.area
            })
            ctx.assert(!findUser, code.BadRequest, '域名已存在')
        }
        object = new this.DB(object)
        return await object.save()
    },
    /** 修改保存 (支持修改密码) */
    async save(ctx, object) {
        const findUser = await this.DB.findOne({
            _id: {
                $ne: object._id
            },
            username: object.username,
            admin: object.admin
        })
        ctx.assert(!findUser, code.BadRequest, '用户名已存在')
        if (object.area) { // 域名不能相同
            const findUser = await this.DB.findOne({
                _id: {
                    $ne: object._id
                },
                area: object.area
            })
            ctx.assert(!findUser, code.BadRequest, '域名已存在')
        }
        let user = await this.DB.findById(object._id)
        for (let key in object) {
            user[key] = object[key]
        }
        return await user.save()
    },
    /** 登录 */
    async login(ctx, user) {
        // 根据域名获取 指定 管理员
        let admin = null
        if (ctx.state.area) admin = await User.findOne({
            area: ctx.state.area
        })
        if (admin) { // 普通用户 || 管理员登录
            const findUser = await User.findOne({
                username: user.username,
                $or: [{
                        admin
                    },
                    {
                        area: ctx.state.area
                    }
                ]
            })
            ctx.assert(findUser, code.Unauthorized, '用户不存在')
            ctx.assert(findUser.status, code.Unauthorized, '当前账户未启用，请联系管理员！')
            ctx.assert(
                findUser.authenticate(user.password),
                code.Unauthorized, '密码错误'
            )
            ctx.session.user = findUser
            return findUser
        } else { // 超级管理员登录
            const findUser = await User.findOne({
                username: user.username,
                type: 'super'
            })
            ctx.assert(findUser, code.Unauthorized, '用户不存在')
            ctx.assert(findUser.status, code.Unauthorized, '当前账户未启用，请联系管理员！')
            ctx.assert(
                findUser.authenticate(user.password),
                code.Unauthorized, '密码错误'
            )
            ctx.session.user = findUser
            return findUser
        }

    },
    /** 删除 */
    async del(ctx, object) {
        resourceSchemaArr.forEach(async schema => {
            await schema.deleteMany({
                admin: object._id
            })
        })
        return await this.DB.deleteOne({
            _id: object._id
        })
    },
    /** 批量删除 */
    async delMore(ctx, ids) {
        resourceSchemaArr.forEach(async schema => {
            await schema.deleteMany({
                admin: {
                    $in: ids
                }
            })
        })
        return await this.DB.deleteMany({
            _id: {
                $in: ids
            }
        })
    }
}