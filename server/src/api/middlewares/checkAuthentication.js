const { ValidateSignature } = require("../../utils/authTools");
module.exports = async (req, res, next) => {
  console.log(req.cookies.access_token);

  const isAuthenticated = await ValidateSignature(req);
  if (isAuthenticated) {
    res.locals.user_id = req.user.id;
    return next();
  }
  return res
    .status(403)
    .json({ message: "Not Authenticated, an error occured" });
};
