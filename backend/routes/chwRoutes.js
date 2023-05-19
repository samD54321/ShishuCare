const router = require("express").Router();
const { protectedRoute } = require("../middleware/authHandlerMiddleware");

const {
  getCHWs,
  getCHW,
  registerCHW,
  updateCHW,
  deleteCHW,
  loginCHW,
} = require("../controller/chwController");

router.route("/").get(protectedRoute, getCHWs).post(registerCHW);
router.route("/login").post(loginCHW);
router
  .route("/:chwId")
  .get(protectedRoute, getCHW)
  .put(protectedRoute, updateCHW)
  .delete(protectedRoute, deleteCHW);

module.exports = router;
