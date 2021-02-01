const Post = require('../models/Post');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get All Posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user')
    .populate('replyTo')
    .sort({date: -1});

  await User.populate(posts, {path: 'replyTo.user'});

  res.json(posts);
});

// @desc    Create Post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const {text, replyTo} = req.body;

  const postData = {
    user: req.user.id,
    text,
    handle: req.user.handle,
  };

  if (replyTo) {
    postData.replyTo = replyTo;
  }

  const post = await Post.create(postData);

  const filter = {handle: req.user.handle};

  await User.findOneAndUpdate(filter, {$addToSet: {posts: post}});

  res.json(post);
});

// @desc    Get Post By Id
// @route   GET /api/posts/:id
// @access  Private
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('replyTo');

  res.json(post);
});

// @desc    Get Post By Id
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  res.json({message: 'Post Deleted', payload: post});
});

// @desc    Like Post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log('Likes - Post: ', post);

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(400).json({message: 'Post already liked'});
  }

  post.likes.unshift({user: req.user.id});

  await post.save();

  res.json({
    id: post._id,
    likes: post.likes,
  });
});

// @desc    Unlike Post
// @route   POST /api/posts/unlike/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.likes.filter((like) => like.user._id.toString() === req.user.id)
      .length === 0
  ) {
    return res.status(400).json({message: 'Post has not yet been liked'});
  }

  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.json({
    id: post._id,
    likes: post.likes,
  });
});

// @desc    Create Comment
// @route   POST /api/posts/comment/:id
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const {comment} = req.body;

  const user = await User.findOne({handle: req.user.handle}).select(
    '-password'
  );
  const post = await Post.findById(req.params.id);

  const newComment = {
    comment,
    handle: user.handle,
    avatar: user.avatar,
    user: req.user.id,
    likes: [],
    replies: [],
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
    return res.status(404).json({message: 'Comment not found'});
  }

  if (comment.user.toString() !== req.user.id) {
    return res.status(401).json({message: 'User not authorized'});
  }

  const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);

  post.comments.splice(removeIndex, 1);

  await post.save();

  res.json(post.comments);
});

const getComments = asyncHandler(async (req, res) => {});

module.exports = {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  getComments,
};

// Reusable/Refactored Helpers
