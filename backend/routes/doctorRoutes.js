const router = require('express').Router()
const {
  getDoctor,
  getDoctors,
  registerDoctor,
  updateDoctor,
  deleteUser,
  loginDoctor,
} = require("../controller/doctorController");
const {protectedRoute} = require("../middleware/authHandlerMiddleware")

router.route("/").get(protectedRoute,getDoctors).post(registerDoctor);
router.route("/login").post(loginDoctor);
router
  .route("/:doctorId")
  .get(protectedRoute, getDoctor)
  .put(protectedRoute, updateDoctor)
  .delete(protectedRoute,deleteUser);



module.exports = router