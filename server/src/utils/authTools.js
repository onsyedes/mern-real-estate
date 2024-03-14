const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { JWT_SECRET_KEY } = require("./../config");
module.exports.ValidateSignature = async (req) => {
  try {
    // const signature = req.get("Authorization");
    const token = req.cookies.access_token;
    if (!token) return false;
    const payload = await jwt.verify(token, JWT_SECRET_KEY);
    req.user = payload;
    return true;
  } catch (error) {
    return false;
  }
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: payload.expiresIn,
    });
  } catch (error) {
    return error;
  }
};
module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
