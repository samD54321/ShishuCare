const router = require("express").Router();
const { protectedRoute } = require("../middleware/authHandlerMiddleware");
const {
  registerVisit,
  getVisit,
  allVisit,
  updateVisit,
} = require("../controller/visitController");

router.get("/", protectedRoute, allVisit);
router.route("/:patientId").post(protectedRoute, registerVisit);
router
  .route("/:visitId")
  .get(protectedRoute, getVisit)
  .put(protectedRoute, updateVisit);

module.exports = router;
