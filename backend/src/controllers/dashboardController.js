const Project = require("../models/Project");

const Certification =
  require("../models/Certification");

const Achievement =
  require("../models/Achievement");

const VerificationRequest =
  require("../models/VerificationRequest");

const ProfileAnalytics =
  require("../models/ProfileAnalytics");


// USER DASHBOARD
const getDashboardStats =
  async (req, res) => {
    try {

      const userId = req.user._id;

      const totalProjects =
        await Project.countDocuments({
          user: userId,
        });

      const totalCertifications =
        await Certification.countDocuments({
          user: userId,
        });

      const totalAchievements =
        await Achievement.countDocuments({
          user: userId,
        });

      const totalVerifications =
        await VerificationRequest.countDocuments({
          user: userId,
          status: "approved",
        });

      let analytics =
        await ProfileAnalytics.findOne({
          user: userId,
        });

      if (!analytics) {
        analytics =
          await ProfileAnalytics.create({
            user: userId,
          });
      }

      res.json({
        totalProjects,
        totalCertifications,
        totalAchievements,
        totalVerifications,

        analytics,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getDashboardStats,
};