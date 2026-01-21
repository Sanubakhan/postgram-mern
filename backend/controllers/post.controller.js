const Post = require("../models/userpost.model");
const Profile = require("../models/profile.model");


// ✅ CREATE POST
async function createPost(req, res) {
  try {
    const userId = req.userId;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(400).json({ message: "Create profile first" });
    }

    const { imageUrl, caption } = req.body;

    const post = await Post.create({
      userId,
      imageUrl,
      caption,
    });

    profile.postsCount += 1;
    await profile.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


// ✅ GET MY POSTS (for my profile)
async function getMyPosts(req, res) {
  try {
    const userId = req.userId;

    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


// ✅ GET POSTS BY USER ID (public profile grid)
async function getPostsByUserId(req, res) {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId })
      .populate("userId", "username avatarUrl")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllPosts(req, res) {
  const posts = await Post.find()
    .populate("userId", "username avatarUrl")
    .sort({ createdAt: -1 });

  res.json(posts);
}


module.exports = {
  createPost,
  getMyPosts,
  getPostsByUserId,
  getAllPosts
};
