const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { checkAuthentication, ensureAuthorized } = require("../middlewares");
router.param("id", userController.checkId);
// router.route("/").get(userController.getAllUsers);
// router.route("/:id").get(userController.findById);
router
  .route("/update/:id")
  .patch(checkAuthentication, ensureAuthorized, userController.updateUser);
module.exports = router;
