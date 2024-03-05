require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_MAILER_PSWD: process.env.NODE_MAILER_PSWD,
  NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL,
};
