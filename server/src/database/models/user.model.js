const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      // unique: [true, "Email is already in use"],
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    salt: String,
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.post("deleteOne", async function () {
  let id = this.getQuery()["_id"];

  await mongoose.model("Listing").deleteMany({ userRef: id });
});

module.exports = mongoose.model("User", userSchema);
