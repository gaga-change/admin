const mongoose = require('mongoose')
const crypto = require('crypto')
const {
    Schema
} = mongoose

const TYPE = {
    SUPER: 'super',
    ADMIN: 'admin'
}

/**
 * User Schema
 */

const UserSchema = new Schema({
    // 密文
    hashedPassword: {
        default: '',
        type: String
    },
    // 别名
    username: {
        default: '',
        type: String,
        trim: true
    },
    salt: {
        default: '',
        type: String
    },
    // 邮箱
    email: {
        default: '',
        type: String
    },
    // 手机号码
    phone: {
        default: '',
        type: String
    },
    // 类别
    type: {
        type: String
    },
    // 类别名称(显示用)
    typeName: {
        type: String
    },
    // 备注
    remark: {
        default: '',
        type: String
    },
    // 是否启用
    status: {
        default: false,
        type: Boolean
    }
}, {
    timestamps: true
})

/** 虚拟属性 */
UserSchema.virtual('password').set(function set(password) {
    this.textPassword = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
}).
get(function get() {
    return this.textPassword
})

/** 实例方法 */
UserSchema.methods = {

    /**
     * 验证 - 检测密码是否正确
     * @param {String} plainText 普通的文本（明文）
     * @returns {Boolean} 返回是否正确
     */
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword
    },

    /**
     * 加密 password
     * @param {String} password 明文
     * @returns {String} 密文
     */
    encryptPassword(password) {
        if (!password) {
            return ''
        }
        try {
            return crypto.
            createHmac('sha1', this.salt).
            update(password).
            digest('hex')
        } catch (err) {
            return ''
        }
    },

    /**
     * 创建 salt
     * @returns {String} 返回salt
     */
    makeSalt() {
        return String(Math.round(new Date().valueOf() * Math.random()))
    },
    /** 设置当前用户为超级管理员 */
    setSuper() {
        this.type = TYPE.SUPER
        this.typeName = "超级管理员"
    },
    /** 设置当前用户为管理员 */
    setAdmin() {
        this.type = TYPE.ADMIN
        this.typeName = "管理员"
    }
}

/** 静态方法 */
UserSchema.statics = {
    findAll({
        page = 1,
        pageSize = 20,
        select = '',
        criteria = {}
    } = {}) {
        pageSize = Math.min(30, pageSize)
        return Promise.all([
            this.find(criteria)
            .select(select)
            .sort({
                createdAt: -1
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize),
            this.countDocuments(criteria)
        ]).then(res => {
            return {
                data: res[0],
                page: {
                    count: res[1],
                    page,
                    pageSize
                }
            }
        })
    }
}
module.exports = mongoose.model('User', UserSchema, 'user_ds')