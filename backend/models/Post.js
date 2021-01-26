const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  handle: {
    type: String,
  },
  avatar: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  graphic: {
    type: String,
  },
  pinned: {
    type: Boolean,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      handle: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
