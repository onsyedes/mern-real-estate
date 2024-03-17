module.exports = (req, res, next) => {
  if (res.locals.user_id === req.params.user_ref) return next();
  return res.status(403).json({ message: "Not Authorized" });
};
