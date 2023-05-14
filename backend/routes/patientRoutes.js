const router = require("express").Router();

const {
  getPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient,
} = require("../controller/patientController");

router.route("/").get(getPatients).post(registerPatient);
router.route("/:patientId").get(getPatient).put(updatePatient).delete(deletePatient);

module.exports = router;
