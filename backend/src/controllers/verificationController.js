const VerificationRequest =
  require("../models/VerificationRequest");


// CREATE REQUEST
const createVerificationRequest =
  async (req, res) => {
    try {

      const {
        itemType,
        itemId,
      } = req.body;

      const request =
        await VerificationRequest.create({
          user: req.user._id,
          itemType,
          itemId,

          proofFile: req.file
            ? req.file.path
            : "",
        });

      res.status(201).json(request);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// MY REQUESTS
const getMyRequests = async (req, res) => {
  try {

    const requests =
      await VerificationRequest.find({
        user: req.user._id,
      });

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADMIN GET ALL
const getAllRequests = async (req, res) => {
  try {

    const requests =
      await VerificationRequest.find()
        .populate("user", "name email");

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// APPROVE
const approveRequest = async (req, res) => {
  try {

    const request =
      await VerificationRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "approved";

    request.remarks =
      req.body.remarks || "";

    request.verifiedBy =
      req.user._id;

    await request.save();

    res.json(request);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// REJECT
const rejectRequest = async (req, res) => {
  try {

    const request =
      await VerificationRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "rejected";

    request.remarks =
      req.body.remarks || "";

    request.verifiedBy =
      req.user._id;

    await request.save();

    res.json(request);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVerificationRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
};