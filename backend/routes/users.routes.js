const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
  login,
  register,
  getUsers,
  getUserById,
  getLoggedInProfile,
  updateProfile,
} = require("../controller/users.controller");

router.route("/").post(register).get(protect, getUsers);

router.get("/:id", protect, getUserById);

router.post("/login", login);

router
  .route("/profile")
  // .get(protect, getLoggedInProfile)
  .put(protect, updateProfile);

  router.get('/profile/:id', protect, getLoggedInProfile);
module.exports = router;
