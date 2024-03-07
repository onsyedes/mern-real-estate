const jwt = require("jsonwebtoken");

const {
  asyncErrorHandler,
  CustomError,
  EmailSender,
} = require("./../../utils");
const { userModel } = require("./../../database");
const {
  ValidatePassword,
  GenerateSignature,
  GenerateSalt,
  GeneratePassword,
} = require("./../../utils/authTools");
const { CLIENT_URL, JWT_SECRET_KEY } = require("../../config");

module.exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = { ...req.body };
  console.log({ email, password });
  const userExists = await userModel.find({
    email,
  });
  if (userExists.length > 0) {
    const user = userExists[0];

    var isPasswordValid = await ValidatePassword(
      password,
      user.password,
      user.salt
    );
    if (isPasswordValid) {
      const token = await GenerateSignature({
        email: user.email,
        id: user._id,
        expiresIn: "30d",
      });

      return res
        .cookie("access-token", token, { httpOnly: true })
        .status(200)
        .json({
          status: "success",
          data: {
            user: {
              id: user._id,
              email: user.email,
              avatar: user.avatar,
              username: user.username,
            },
          },
        });
    } else {
      let error = new CustomError("Wrong password", 400);
      next(error);
    }
  } else {
    let error = new CustomError("Email does not exist", 400);
    next(error);
  }
});

module.exports.signup = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password } = { ...req.body.user };
  let salt = await GenerateSalt();
  let cryptedPassword = await GeneratePassword(password, salt);
  let createdUser = await userModel.create({
    email,
    username,
    password: cryptedPassword,
    salt,
  });
  if (createdUser) {
    sendEmailValidationToken(
      createdUser.email,
      createdUser._id,
      createdUser.salt
    );
  }
  return res.status(200).json({ data: createdUser });
});

module.exports.activateAccount = asyncErrorHandler(async (req, res, next) => {
  try {
    const token = req.query.token;

    const response = await verifyEmailToken(token);

    return res.status(200).json(response);
  } catch (err) {
    let error = new CustomError(err.message, 500);
    console.log(error);
    next(error);
  }
});

module.exports.googleAuthentication = asyncErrorHandler(
  async (req, res, next) => {
    const { email, avatar, username } = { ...req.body };

    //check if user exists
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      //login
      await generateTokenForGoogleAuth(user, res);
    } else {
      //create new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = await GenerateSalt();
      let cryptedPassword = await GeneratePassword(generatedPassword, salt);
      let generatedUsername =
        username.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      let createdUser = await userModel.create({
        email,
        username: generatedUsername,
        password: cryptedPassword,
        salt,
        avatar,
        isEnabled: true,
      });
      await generateTokenForGoogleAuth(createdUser, res);
    }
  }
);

async function sendEmailValidationToken(email, id, salt) {
  const token = await GenerateSignature({ salt, id, expiresIn: "1d" });
  const subject = "Hello ✔";
  const htmlBody = `<h1>Hello and Welcome RealEstate</h1>
              <span>Please Click to this Link to validate your Email address: </span>
              <a href="${CLIENT_URL}?token=${token}">Validate Your Email</a>`;
  const textBody = `Welcome To Jems Group , Please Click to this Link to verify your Email : ${CLIENT_URL}?token=${token} `;
  await EmailSender(email, subject, htmlBody, textBody);
}

async function verifyEmailToken(token) {
  try {
    const response = jwt.verify(token, JWT_SECRET_KEY);

    const user = await userModel.findById(response.id);
    await userModel.findByIdAndUpdate(user._id, { isEnabled: true });

    return response;
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
}

async function generateTokenForGoogleAuth(user, res) {
  const token = await GenerateSignature({
    email: user.email,
    id: user._id,
    expiresIn: "30d",
  });
  const { password: pass, ...rest } = user._doc;

  return res
    .cookie("access-token", token, { httpOnly: true })
    .status(200)
    .json({
      status: "success",
      data: {
        user: rest,
      },
    });
}
