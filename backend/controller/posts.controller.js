const Post = require("../models/Post");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Get All Posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("user");

  console.log(posts);

  res.json(posts);
});

// @desc    Create Post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;

  let post = await Post.create({
    user: req.user.id,
    text,
    handle: req.user.handle,
  });

  res.json(post);
});

// @desc    Get Post By Id
// @route   GET /api/posts/:id
// @access  Private
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (post) {
    res.json(post);
  }
});

// @desc    Get Post By Id
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.json({ message: "Post Deleted" });
});

// @desc    Like Post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: "likes",
    populate: {
      path: "user",
      select: "-password",
    },
  });
  console.log("Likes - Post: ", post);

  if (
    post.likes.filter((like) => like.user._id.toString() === req.user.id).length > 0
  ) {
    return res.status(400).json({ message: "Post already liked" });
  }

  post.likes.unshift({ user: req.user.id });

  const user = await User.findById(req.user.id);

  user.likes = [...user.likes, post];

  await user.save();
  await post.save();

  res.json(post.likes);
});

// @desc    Unlike Post
// @route   POST /api/posts/unlike/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.likes.filter((like) => like.user._id.toString() === req.user.id).length ===
    0
  ) {
    return res.status(400).json({ message: "Post has not yet been liked" });
  }

  const removeIndex = post.likes
    .map((like) => like.user._id.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.json(post.likes);
});

// @desc    Create Comment
// @route   POST /api/posts/comment/:id
// @access  Private
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

// @desc    Delete Comment
// @route   DELETE /api/posts/comment/:id/:comment_id
// @access  Private
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
