const router= require('express').Router();
const {
  registerVisit,
  getVisit,
  allVisit,
} = require("../controller/visitController");

router.get("/", allVisit);
router.route('/:patientId').post(registerVisit)
router.route('/:visitId').get(getVisit)

module.exports= router;