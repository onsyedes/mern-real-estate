const express = require("express");
const { PORT } = require("./config");
const expressApp = require("./express-app");
const { databaseConnection } = require("./database");

const StartServer = async () => {
  process.on("unhandledRejection", (error) => {
    console.log({ errorName: error.name, message: error.message });
    console.log("Unhandled Rejection occured. Shutting down!  x__x");

    process.exit(1);
  });
  process.on("uncaughtException", (error) => {
    console.log({ errorName: error.name, message: error.message });
    console.log("uncaught Exception occured. Shutting down!  x__x");
    process.exit(1);
  });
  const app = express();
  await databaseConnection();
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
