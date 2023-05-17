const router = require('express').Router()
const {
  getDoctor,
  getDoctors,
  registerDoctor,
  updateDoctor,
  deleteUser,
} = require("../controller/doctorController");
const {protectedRoute} = require("../middleware/authHandlerMiddleware")

router.route("/").get(protectedRoute,getDoctors).post(registerDoctor);
router.route("/:doctorId").get(getDoctor).put(updateDoctor).delete(deleteUser);

module.exports = router