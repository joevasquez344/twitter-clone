const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc    Log In User
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { handle, password } = req.body;

  const user = await User.findOne({ handle });

  const passwordMatch = await bcrypt.compare(password, user.password);

  console.log(passwordMatch);

  if (user && passwordMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      _id: user._id,
      handle: user.handle,
      birthday: user.birthday,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { handle, password, birthday } = req.body;

  const userExist = await User.findOne({ handle });

  if (userExist) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    handle,
    password: hashedPassword,
    birthday,
  });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      handle: user.handle,
      birthday: user.birthday,
      token,
    });
  } else {
    console.error(error.message);
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.status(200).json(users);
  } else {
    throw new Error("Could not fetch users");
  }
});

// @desc    Get User By Id
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate({
    path: "likes",
  });

  const posts = await Post.find({ user: req.params.id });

  console.log("Posts: ", posts);

  if (user) {
    user.posts = posts;

    await user.save();

    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log("Req User from update profile: ", req.user);

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    user.website = req.body.website || user.website;
    user.birthday = req.body.birthday || user.birthday;
    user.avatar = req.body.avatar || user.avatar;
    user.banner = req.body.banner || user.banner;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      bio: updatedUser.bio,
      location: updatedUser.location,
      website: updatedUser.website,
      birthday: updatedUser.birthday,
      avatar: updatedUser.avatar,
      banner: updatedUser.banner,
      token,
    });
  }
});

// @desc    Get Users Posts
// @route   GET /api/users/:id/posts
// @access  Private
const getUsersPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.id });

  res.json(posts);
});

// @desc    Get User's Liked Posts
// @route   GET /api/users/:id/likes
// @access  Private
const getUsersLikedPosts = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id).populate("likes");

  // res.json(user.likes);

  const posts = await Post.find({});
});

const followUser = asyncHandler(async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user.id);

  // Check to see if the logged in user already exists in the followers array
  let userMatch = userToFollow.followers.find((user) => user == req.user.id);

  console.log("User Match: ", userMatch);

  if (userMatch == req.user.id) {
    return res.json({
      message: {
        error: "You already follow this user",
      },
    });
  }

  userToFollow.followers.push(req.user);
  loggedInUser.following.push(req.params.id);

  await userToFollow.save();
  await loggedInUser.save();

  res.status(200).json(loggedInUser.following);
});

const unfollowUser = asyncHandler(async (req, res) => {
  const userToUnfollow = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user.id);


  let userMatch = userToUnfollow.followers.find((user) => user == req.user.id);

  if (userMatch) {
    const updatedFollowers = userToUnfollow.followers.filter((user) => user != req.user.id);
    const updatedFollowing = loggedInUser.following.filter(user => user != req.params.id);

    userToUnfollow.followers = updatedFollowers;
    loggedInUser.following = updatedFollowing;

    await userToUnfollow.save();
    await loggedInUser.save();

    res.status(200).json({
      message: "User unfollowed",
      followers: userToUnfollow.followers,
    });
  } else {
    return res.json({
      message: {
        error: "Cannot unfollow because you do not follow this user",
      },
    });
  }
});

const getUsersFollowers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("followers");

  const followers = user.followers.map(user => {
    const updatedUser = {};

    updatedUser._id = user._id;
    updatedUser.handle = user.handle;

    return updatedUser;
  })

  console.log('Followers: ', user.followers)

  res.json(followers);
});

module.exports = {
  login,
  register,
  getUsers,
  getUserById,
  updateProfile,
  getUsersLikedPosts,
  getUsersPosts,
  getUsersFollowers,
  followUser,
  unfollowUser,
};
