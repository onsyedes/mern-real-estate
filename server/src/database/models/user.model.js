const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already in use"],
    },
    email: {
      unique: [true, "Email is already in use"],
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: Number,
    rating: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
