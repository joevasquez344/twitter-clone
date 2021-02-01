const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
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
  getUsersFollowing
} = require("../controller/users.controller");

router.route("/").post(register).get(protect, getUsers);

router.get("/:handle", protect, getUserById);

router.post("/login", login);

router.route("/profile").put(protect, updateProfile);

router.route("/:handle/posts").get(protect, getUsersPosts);
router.route("/:handle/likes").get(protect, getUsersLikedPosts);

router.route('/:handle/follow').post(protect, followUser)
router.route('/:handle/unfollow').put(protect, unfollowUser)
router.route("/:handle/followers").get(protect, getUsersFollowers);
router.route("/:handle/following").get(protect, getUsersFollowing);

// router.get('/profile/:id', protect, getLoggedInProfile);
module.exports = router;
