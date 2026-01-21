const Profile = require("../models/profile.model");

// ================= CREATE PROFILE =================
async function createProfile(req, res) {
  try {
    const userId = req.userId;
    const { username, bio, avatarUrl } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const exists = await Profile.findOne({
      $or: [{ userId }, { username }],
    });

    if (exists) {
      return res.status(400).json({
        message: "Profile or username already exists",
      });
    }

    let finalAvatarUrl = "";
    // Handle file upload (multipart/form-data)
    if (req.file) {
      finalAvatarUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
    }
    // Handle base64 string from JSON body
    else if (avatarUrl) {
      finalAvatarUrl = avatarUrl;
    }

    const profile = await Profile.create({
      userId,
      username,
      bio,
      avatarUrl: finalAvatarUrl,
    });

    res.status(201).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// ================= GET MY PROFILE =================
async function getMyProfile(req, res) {
  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
}

// ================= GET PROFILE BY USERNAME =================
async function getProfileByUsername(req, res) {
  const profile = await Profile.findOne({ username: req.params.username });
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
}

// ================= UPDATE PROFILE =================
async function updateProfile(req, res) {
  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) return res.status(404).json({ message: "Profile not found" });

  const { username, bio, avatarUrl } = req.body;

  if (username && username !== profile.username) {
    const taken = await Profile.findOne({ username });
    if (taken) {
      return res.status(400).json({ message: "Username already taken" });
    }
    profile.username = username;
  }

  if (bio !== undefined) profile.bio = bio;

  // Handle file upload (multipart/form-data)
  if (req.file) {
    profile.avatarUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;
  }
  // Handle base64 string from JSON body
  else if (avatarUrl !== undefined) {
    profile.avatarUrl = avatarUrl;
  }

  await profile.save();
  res.json({ profile });
}

module.exports = {
  createProfile,
  getMyProfile,
  getProfileByUsername,
  updateProfile,
};
