const Post = require("../models/Post");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const post = await Post.create({
    user: req.user,
    text,
  });

  res.json(post);
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (post) {
    res.json(post);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.json({ message: "Post Deleted" });
});

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(400).json({ message: "Post already liked" });
  }

  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.json(post.likes);
});

const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return res.status(400).json({ message: "Post has not yet been liked" });
  }

  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.json(post.likes);
});

const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const user = await User.findById(req.user.id).select("-password");
  const post = await Post.findById(req.params.id);

  const newComment = {
    comment,
    handle: user.handle,
    avatar: user.avatar,
    user: req.user.id,
  };

  post.comments.unshift(newComment);

  await post.save();

  res.json(post.comments);
});

const removeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);

  post.comments.splice(removeIndex, 1);

  await post.save();

  res.json(post.comments);
});

module.exports = {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
};
