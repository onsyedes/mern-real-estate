"use strict";
const { NODE_MAILER_PSWD, NODE_MAILER_EMAIL } = require("./../config");
const nodemailer = require("nodemailer");

module.exports = async (email, subject, html, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: NODE_MAILER_EMAIL,
      pass: NODE_MAILER_PSWD,
    },
    debug: true,
  });

  const message = {
    from: '"Activate your account 👻" ons.yedes@gmail.com', // sender address
    //!TODO : Change the email
    to: "ons.yedes@gmail.com", // list of receivers
    subject: subject,
    text: text,
    html: html,
  };
  await transporter.sendMail(message, (err, info) => {
    if (err) console.log("Error sending", err);
    if (info) console.log(info.response);
  });
};

// module.exports = { EmailSender };
