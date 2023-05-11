const router = require('express').Router()
const {getDoctors, createDoctor}= require('../controller/doctorController')

router.route('/').get(getDoctors).post(createDoctor)

module.exports = router