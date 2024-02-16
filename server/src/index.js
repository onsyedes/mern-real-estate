const express = require("express");
const { PORT } = require("./config");
const expressApp = require("./express-app");
const StartServer = async () => {
  process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    console.log("Unhandled Rejection occured. Shutting down!");

    process.exit(1);
  });
  process.on("uncaughtException", (error) => {
    console.log(error.name, error.message);
    console.log("uncaught Exception occured. Shutting down!");
    process.exit(1);
  });
  const app = express();

  await expressApp(app);
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
