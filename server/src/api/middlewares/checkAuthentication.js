const { ValidateSignature } = require("../../utils/authTools");
module.exports = async (req, res, next) => {
  const isAuthenticated = await ValidateSignature(req);
  if (isAuthenticated) {
    res.locals.user_id = req.user.id;
    return next();
  }
  return res.status(401).json({ message: "Not Authenticated" });
};
