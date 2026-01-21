const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  createPost,
  getMyPosts,
  getPostsByUserId,
  getAllPosts
} = require("../controllers/post.controller");

// create post
router.post("/", auth, createPost);

// my posts (profile grid)
router.get("/me", auth, getMyPosts);

// public user posts
router.get("/user/:userId", getPostsByUserId);

// public feed (home)
router.get("/", getAllPosts);


module.exports = router;
