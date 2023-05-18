const {
  createDiagnosis,
  getDiagnosis,
  updateDiagnosis,
} = require("../controller/diagnosisController");
const { protectedRoute } = require("../middleware/authHandlerMiddleware");


const router = require("express").Router();
router.route("/").get(protectedRoute,getDiagnosis);
router
  .route("/:visitId")
  .post(protectedRoute, createDiagnosis)
  .put(protectedRoute,updateDiagnosis);

module.exports = router;
