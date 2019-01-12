const mongoose = require('mongoose')
const {
    Schema
} = mongoose

// 个人基本信息
const person = {
    // 姓名
    name: {
        default: '',
        type: String
    },
    // 证件号码
    card: {
        default: '',
        type: String
    },
    // 证件类型
    cardType: {
        default: '',
        type: String
    },
    // 证件有效期
    cardExpiryDate: {
        type: Date
    },
    // 出生年月
    birthday: {
        type: Date
    },
    // 国籍
    nationality: {
        default: '',
        type: String
    },
    // 性别
    sex: {
        default: '',
        type: String
    },
    // 手机号
    phone: {
        default: '',
        type: String
    },
    // 联系地址
    address: {
        default: '',
        type: String
    },
    // 户籍
    familyRegister: {
        default: '',
        type: String
    }
}

// 字典 dict
const dict = {
    // 校区
    campus: {
        default: '',
        type: String
    },
    // 班型
    classType: {
        default: '',
        type: String
    },
    // 报名价格
    registerPrice: {
        type: Number
    },
    // 推荐人
    referrer: {
        default: '',
        type: String
    },
    // 报名点
    regPoint: {
        default: '',
        type: String
    }
}

// 状态
const state = {
    // 是否体检
    healthExamination: {
        default: false,
        type: Boolean
    },
    // 数量默认为1。 
    // 科目一考试次数 （默认1次）
    subjectOneNum: {
        default: 1,
        type: Number
    },
    // 科目一考试状态 （false: 为通过 true: 通过）
    subjectOne: {
        default: null,
        type: Boolean
    },
    // 科目二考试次数
    subjectTwoNum:  {
        default: 1,
        type: Number
    },
    subjectTwo: {
        default: null,
        type: Boolean
    },
    // 科目三考试次数
    subjectThreeNum:  {
        default: 1,
        type: Number
    },
    subjectThree: {
        default: null,
        type: Boolean
    },
    // 科目四考试次数
    subjectFourNum:  {
        default: 1,
        type: Number
    },
    subjectFour: {
        default: null,
        type: Boolean
    },
    subjectHistory: [
        {
            // 考试日期
            examDate: {
                default: null,
                type: Date,
            },
            // 是否通过。（false 为未通过， true 为通过）
            state : {
                default: null,
                type: Boolean
            },
            // 考试科目 （1、 2、 3、 4）
            subject: {
                default: null,
                type: Number
            },
        }
    ]
}

const CarStudentSchema = new Schema({
    ...person,
    ...dict,
    ...state,
    // 报名日期
    registerDate: {
        default: Date.now(),
        type: Date
    },
    // 登记地址
    registerAddress: {
        default: '',
        type: String
    },
    // 外校转入
    otherSchool: {
        default: false,
        type: Boolean
    },
    // 车型
    carType: {
        default: '',
        type: String
    },
    // 申请类型
    registerType: {
        default: '',
        type: String
    },
    // 备注
    remark: {
        default: '',
        type: String
    },
    admin: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

CarStudentSchema.statics = {
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

module.exports = mongoose.model('CarStudent', CarStudentSchema, 'carStudent_ds')