const express = require("express");
const { listingController } = require("../controllers");
const { checkAuthentication, ensureAuthorized } = require("../middlewares");
const router = express.Router();

router
  .route("/:user_ref")
  .post(checkAuthentication, ensureAuthorized, listingController.addlisting);
module.exports = router;
