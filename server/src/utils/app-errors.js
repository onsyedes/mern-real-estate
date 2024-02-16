const CostumError = require("./CustomError");
const validationErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data : ${errorMessages}`;
  return new CostumError(msg, 400);
};

const castErrorHandler = (error) => {
  const msg = `Invalid value for ${error.path} : ${error.value}`;
  return new CustomError(msg, 400);
};
const duplicateKeyErrorHAndler = (error) => {
  const name = error.keyValue.name;

  const msg = `" ${name} " is already in use.`;
  return new CostumError(msg, 400);
};
module.exports = {
  validationErrorHandler,
  castErrorHandler,
  duplicateKeyErrorHAndler,
};
