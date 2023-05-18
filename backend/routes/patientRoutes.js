const router = require("express").Router();
const { protectedRoute } = require("../middleware/authHandlerMiddleware");
const {
  getPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient,
} = require("../controller/patientController");

router
  .route("/")
  .get(protectedRoute, getPatients)
  .post(protectedRoute, registerPatient);
router
  .route("/:patientId")
  .get(protectedRoute, getPatient)
  .put(protectedRoute, updatePatient)
  .delete(protectedRoute, deletePatient);

module.exports = router;
