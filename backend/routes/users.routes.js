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
  unfollowUser
} = require("../controller/users.controller");

router.route("/").post(register).get(protect, getUsers);

router.get("/:id", protect, getUserById);

router.post("/login", login);

router.route("/profile").put(protect, updateProfile);

router.route("/:id/posts").get(protect, getUsersPosts);
router.route("/:id/likes").get(protect, getUsersLikedPosts);

router.route('/:id/follow').post(protect, followUser)
router.route('/:id/unfollow').put(protect, unfollowUser)
router.route("/:id/followers").get(protect, getUsersFollowers);

// router.get('/profile/:id', protect, getLoggedInProfile);
module.exports = router;
