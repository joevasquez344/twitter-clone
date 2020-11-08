const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  birthday: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  //   following: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   ],
  //   followers: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
