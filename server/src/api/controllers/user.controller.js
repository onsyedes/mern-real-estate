const {
  asyncErrorHandler,
  CustomError,
  ApiFeatures,
} = require("./../../utils");
const { userModel } = require("./../../database");
const { ObjectId } = require("mongodb");
const { GeneratePassword, ValidatePassword } = require("../../utils/authTools");
module.exports.updateUser = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const { username, avatar, oldPassword, newPassword } = { ...req.body };

  console.log({ username, avatar, oldPassword, newPassword });
  const findUser = await userModel.findById(id);
  const user = {};
  if (username) {
    user.username = username;
  }

  if (newPassword && oldPassword) {
    var isPasswordValid = await ValidatePassword(
      oldPassword,
      findUser.password,
      findUser.salt
    );
    if (isPasswordValid) {
      user.password = await GeneratePassword(newPassword, findUser.salt);
    } else {
      return next(new CustomError("Wrong credentials", 400));
    }
  }

  if (avatar) {
    user.avatar = avatar;
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      $set: { ...user },
    },
    { new: true }
  );
  const { password, salt, isEnabled, ...rest } = updatedUser._doc;
  return res.status(200).json({
    user: {
      ...rest,
    },
  });
});

// const getAllUsers = asyncErrorHandler(async (req, res, next) => {
//   const usersCount = await userModel.countDocuments();
//   const features = new ApiFeatures(userModel.find(), req.query)
//     .filter()
//     .sort()
//     .paginate(usersCount)
//     .limitFields();
//   const data = await features.query;
//   return res.status(200).json({ data: data });
// });

// const findById = asyncErrorHandler(async (req, res, next) => {
//   const data = await userModel.findById(req.params.id);
//   return res.status(200).json({ data });
// });

module.exports.checkId = async (req, res, next, value) => {
  try {
    if (!ObjectId.isValid(value)) {
      const err = new CustomError("invalid id", 400);
      return next(err);
    }
    let user = await userModel.findById(value);
    if (!user) {
      const err = new CustomError("Account not valid", 403);
      return next(err);
    }
    next();
  } catch (error) {
    next(new CustomError(error.message));
  }
};

module.exports.deleteAccount = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const findUser = await userModel.findById(id);
  // if (!findUser) {
  //   const err = new CustomError("User not Found", 404);
  //   return next(err);
  // }
  const deletedUser = await userModel.findByIdAndDelete(id);
  return res.status(200).json({ user: deletedUser });
});
