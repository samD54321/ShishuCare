const {
  createDiagnosis,
  getDiagnosis,
} = require("../controller/diagnosisController");

const router = require("express").Router();
router.route("/").get(getDiagnosis);
router.route("/:visitId").post(createDiagnosis);

module.exports = router;
