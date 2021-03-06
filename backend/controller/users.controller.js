const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc    Log In User
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const {handle, password} = req.body;

  const user = await User.findOne({handle});

  const passwordMatch = await bcrypt.compare(password, user.password);

  console.log(passwordMatch);

  if (user && passwordMatch) {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      _id: user._id,
      handle: user.handle,
      birthday: user.birthday,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
  const {handle, password, birthday} = req.body;

  if (!handle || !password)
    return res.json({error: 'One or more fields are empty'});

  const userExist = await User.findOne({handle});

  if (userExist) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    handle,
    password: hashedPassword,
    birthday,
  });

  if (user) {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '30d',
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
    throw new Error('Could not fetch users');
  }
});

// @desc    Get User By Id
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({handle: req.params.handle})
    .select('-password')
    .populate([{
      path: 'likes',
    }, {path: 'followers'}, {path: 'following'}]);

  const posts = await Post.find({handle: req.params.handle});

  console.log('Posts: ', posts);

  if (user) {
    user.posts = posts;

    await user.save();

    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({handle: req.user.handle});

  console.log('Req User from update profile: ', req.user);

  if (user) {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '30d',
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
  const posts = await Post.find({handle: req.params.handle});

  res.json(posts);
});

// @desc    Get User's Liked Posts
// @route   GET /api/users/:id/likes
// @access  Private
const getUsersLikedPosts = asyncHandler(async (req, res) => {
  console.log('LIKED POSTS: ', req.body.userId);
  const posts = await Post.find({likedBy: req.params.userId});

  res.json(posts);
});

const followUser = asyncHandler(async (req, res) => {
  const profile = await User.findOne({handle: req.params.handle});
  const user = await User.findOne({handle: req.user.handle});

  // let userMatch = profile.followers.find((user) => user == user._id);

  let isFollowing = profile.followers.includes(user._id);

  if (isFollowing) {
    profile.followers = profile.followers.filter((u) => u != user._id);
    user.following = user.following.filter((u) => u != profile._id);

    await profile.save(); 
    await user.save();
 
    res.status(200).json(profile.followers);
  } else {
    profile.followers.push(user);
    user.following.push(profile);

    console.log('Follow Profile: ', profile);
    console.log('Follow User: ', user);

    await profile.save();
    await user.save();

    res.status(200).json(profile.followers);
  }
});

const unfollowUser = asyncHandler(async (req, res) => {
  const targetedUser = await User.findOne({handle: req.params.handle}).populate('followers').select('-password');
  const loggedInUser = await User.findOne({handle: req.user.handle}).populate('following').select('-password');
 
console.log('logged in userrrr: ', targetedUser)

  // let isFollowingProfile = targetedUser.followers.includes('_id', loggedInUser._id);
  let isFollowingProfile = targetedUser.followers.find(user => user._id === loggedInUser._id)
  console.log('FOLLOWERS: ', isFollowingProfile)

 

  if (isFollowingProfile) {
    targetedUser.followers = targetedUser.followers.filter((u) => u != loggedInUser._id);
    loggedInUser.following = loggedInUser.following.filter((u) => u != targetedUser._id);

   

    await targetedUser.save(); 
    await loggedInUser.save();
 
    res.status(200).json(targetedUser.followers);
  } else {
    return res.json({
      message: {
        error: 'Cannot unfollow because you do not follow this user',
      },
    });
  }
});

const getUsersFollowers = asyncHandler(async (req, res) => {
  const user = await User.findOne({handle: req.user.handle}).populate(
    'followers'
  );

  res.json(user.followers);
});

const getUsersFollowing = asyncHandler(async (req, res) => {
  const user = await User.findOne({handle: req.user.handle}).populate(
    'following'
  );

  res.json(user.following);
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
  getUsersFollowing,
  followUser,
  unfollowUser,
};
