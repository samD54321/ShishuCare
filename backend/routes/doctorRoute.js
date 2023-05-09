const router = require('express').Router()
const {getDoctor}= require('../controller/doctorController')

router.route('/').get(getDoctor)

module.exports = router