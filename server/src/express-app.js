const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { user, authentication } = require("./api");

const CustomError = require("./utils");
const { ApiErrorHandler } = require("./api/middlewares");
module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  app.use("/api/users", user);
  app.use("/api/auth", authentication);
  app.all("*", (req, res, next) => {
    const err = new CustomError(
      `can't find ${req.originalUrl} on the server`,
      404
    );
    next(err);
  });

  app.use(ApiErrorHandler);
};
