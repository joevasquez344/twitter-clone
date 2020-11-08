const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment
} = require("../controller/posts.controller");

router.route("/").get(protect, getPosts).post(protect, createPost);
router.route("/:id").get(protect, getPostById).delete(protect, deletePost);
router.route("/like/:id").put(protect, likePost)
router.route("/unlike/:id").post(protect, unlikePost);
router.route('/comment/:id').post(protect, addComment);
router.route('/comment/:id/:comment_id').delete(protect, removeComment);


module.exports = router;
