const express=require('express');
const router=express.Router();
const upload = require("../middleware/upload");
const {createProfile}=require('../controllers/profile.controller');
const auth=require('../middleware/auth.middleware');
const {getMyProfile}=require('../controllers/profile.controller');
const {getProfileByUsername}=require('../controllers/profile.controller');
const {updateProfile}=require('../controllers/profile.controller');


router.post('/createprofile', auth, upload.single("avatar"), createProfile);
// get my profile
router.get("/me", auth, getMyProfile);

// public profile (VERY IMPORTANT)
router.get("/:username", getProfileByUsername);
router.put("/update",  auth, upload.single("avatar"), updateProfile);



module.exports = router;