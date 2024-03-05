const { asyncErrorHandler, CustomError } = require("./../../utils");
const { userModel } = require("./../../database");
const {
  ValidatePassword,
  GenerateSignature,
  GenerateSalt,
  GeneratePassword,
} = require("./../../utils/authTools");

module.exports.signup = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password } = { ...req.body.user };
  console.log(username, email, password);
  let salt = await GenerateSalt();
  let cryptedPassword = await GeneratePassword(password, salt);

  let createdUser = await userModel.create({
    email,
    username,
    password: cryptedPassword,
    salt,
  });
  console.log(createdUser);
  return res.status(200).json({ data: createdUser });
});
