const router = require('express').Router()
const {getDoctor, createDoctor}= require('../controller/doctorController')

router.route('/').get(getDoctor).post(createDoctor)

module.exports = router