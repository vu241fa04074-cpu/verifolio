const express = require("express");

const {
  getMyProfile,
  updateProfile,
  getPublicProfile,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// GET MY PROFILE
router.get("/me", protect, getMyProfile);
router.get(
  "/public/:username",
  getPublicProfile
);

// CREATE / UPDATE PROFILE
router.put("/me", protect, updateProfile);

// PUBLIC PROFILE
router.get("/public/:username", getPublicProfile);

module.exports = router;