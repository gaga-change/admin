const CarTrainer = require('./carTrainerSchema')
const baseService = require('../base/baseService')

module.exports = {
    DB: CarTrainer,
    ...baseService
}