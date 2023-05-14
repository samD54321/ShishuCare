const router = require('express').Router()
const {
  getDoctor,
  getDoctors,
  registerDoctor,
  updateDoctor,
  deleteUser,
} = require("../controller/doctorController");

router.route("/").get(getDoctors).post(registerDoctor);
router.route("/:doctorId").get(getDoctor).put(updateDoctor).delete(deleteUser);

module.exports = router