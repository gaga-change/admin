const costController = require('./cost/costController')
const referrerController = require('./referrer/referrerController')
const regPointController = require('./regPoint/regPointController')
const classTypeController = require('./classType/classTypeController')
const campusController = require('./campus/campusController')
const payTypeController = require('./payType/payTypeController')
const responsibleController = require('./responsible/responsibleController')

module.exports = myRouter => {
    costController(myRouter)
    referrerController(myRouter)
    regPointController(myRouter)
    classTypeController(myRouter)
    campusController(myRouter)
    payTypeController(myRouter)
    responsibleController(myRouter)
}