const mongoose = require("mongoose");
const { DB_URL } = require("./../config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log("Database connection rejected, Shutting down! x__x");
    console.log({ ErrorName: error.name, message: error.message });
    process.exit(1);
  }
};
