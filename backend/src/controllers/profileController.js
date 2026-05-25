const Profile = require("../models/Profile");


// GET MY PROFILE
const getMyProfile = async (req, res) => {
  try {

    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", "name email username role");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE OR UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {

    const {
      bio,
      headline,
      skills,
      education,
      workExperience,
      socialLinks,
      profileImage,
      isPublic,
    } = req.body;

    let profile = await Profile.findOne({
      user: req.user._id,
    });

    // UPDATE EXISTING PROFILE
    if (profile) {

      profile.bio = bio || profile.bio;
      profile.headline = headline || profile.headline;
      profile.skills = skills || profile.skills;
      profile.education = education || profile.education;
      profile.workExperience =
        workExperience || profile.workExperience;

      profile.socialLinks =
        socialLinks || profile.socialLinks;

      profile.profileImage =
        profileImage || profile.profileImage;

      profile.isPublic =
        isPublic !== undefined
          ? isPublic
          : profile.isPublic;

      await profile.save();

      return res.json(profile);
    }

    // CREATE NEW PROFILE
    profile = await Profile.create({
      user: req.user._id,
      bio,
      headline,
      skills,
      education,
      workExperience,
      socialLinks,
      profileImage,
      isPublic,
    });

    res.status(201).json(profile);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// PUBLIC PROFILE
const User = require("../models/User");

const getPublicProfile = async (req, res) => {
  try {

    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const profile = await Profile.findOne({
      user: user._id,
      isPublic: true,
    }).populate(
      "user",
      "name username"
    );

    if (!profile) {
      return res.status(404).json({
        message: "Public profile not found",
      });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  updateProfile,
  getPublicProfile,
};