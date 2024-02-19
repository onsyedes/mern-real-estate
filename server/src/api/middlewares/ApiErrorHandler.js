const { appErrors } = require("../../utils");

const { validationErrorHandler, castErrorHandler, duplicateKeyErrorHAndler } =
  appErrors;
const ApiErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "dev") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "prod") {
    if (error.name === "CasError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHAndler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    prodErrors(res, error);
  }
};

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};
const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Something went wrong! Please try again later",
    });
  }
};

module.exports = ApiErrorHandler;
