const express = require("express");
const router = express.Router();
const { authController } = require("./../controllers");

router.route("/signup").post(authController.signup);
router.route("/activate-account").get(authController.activateAccount);
module.exports = router;
