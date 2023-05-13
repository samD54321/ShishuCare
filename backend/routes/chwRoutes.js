const router= require('express').Router();

const {
  getCHWs,
  getCHW,
  registerCHWs,
  updateCHW,
  deleteCHW,
} = require("../controller/chwController");

router.route("/").get(getCHWs).post(registerCHWs);
router.route("/:chwId").get(getCHW).put(updateCHW).delete(deleteCHW);

module.exports = router