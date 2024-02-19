const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.param("id", userController.checkId);
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.findById);
module.exports = router;
