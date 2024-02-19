const {
  asyncErrorHandler,
  CostumError,
  ApiFeatures,
} = require("./../../utils");
const { userModel } = require("./../../database");

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const usersCount = await userModel.countDocuments();
  const features = new ApiFeatures(userModel.find(), req.query)
    .filter()
    .sort()
    .paginate(usersCount)
    .limitFields();
  const data = await features.query;
  return res.status(200).json({ data: data });
});

const findById = asyncErrorHandler(async (req, res, next) => {
  const data = await userModel.findById(req.params.id);
  return res.status(200).json({ data });
});

const checkId = async (req, res, next, value) => {
  let user = await userModel.findById(value);
  console.log(user);
  if (!user) {
    const err = new CostumError("invalid id", 400);
    return next(err);
  }
  next();
};
module.exports = { getAllUsers, checkId, findById };
