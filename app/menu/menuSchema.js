const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const MenuSchema = new Schema({
    // 唯一标识
    sign: {
        default: '',
        type: String,
    },
    // 名称
    name: {
        default: '',
        type: String
    },
    // 父级菜单（若为接口可不添写）
    parent: {
        ref: 'Menu',
        type: Schema.Types.ObjectId
    },
    // 链接地址（只用于展示。若为接口则无需）
    url: {
        default: '',
        type: String,
    },
    // 是否展示在左侧菜单中
    show: {
        default: false,
        type: Boolean
    },
    // 类型： 页面(page) | 接口(api)
    type: {
        default: 'page',
        type: String,
    },
    // 备注
    remark: {
        default: '',
        type: String,
    },
    // 优先级。 越大权限越高
    order: {
        default: 0,
        type: Number
    },
    // 图标
    icon: {
        default: '',
        type: String
    },
    // 访问次数
    num: {
        default: 0,
        type: Number
    },
    // 层级
    tier: {
        default: 0,
        type: Number
    }
},{
    timestamps: true
})

MenuSchema.statics = {
    findAll({
        page = 1,
        pageSize = 20,
        select = '',
        criteria = {}
    } = {}) {
        pageSize = Number(pageSize)
        return Promise.all([
            this.find(criteria)
            .select(select)
            .sort({
                createdAt: -1
            })
            .populate('parent')
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

module.exports = mongoose.model('Menu', MenuSchema, 'menu_ds')