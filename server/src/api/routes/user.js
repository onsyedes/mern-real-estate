const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { checkAuthentication, ensureAuthorized } = require("../middlewares");
router.param("user_ref", userController.checkId);
// router.route("/").get(userController.getAllUsers);
// router.route("/:id").get(userController.findById);
router
  .route("/update/:user_ref")
  .patch(checkAuthentication, ensureAuthorized, userController.updateUser);
router
  .route("/delete/:user_ref")
  .delete(checkAuthentication, ensureAuthorized, userController.deleteAccount);
module.exports = router;
