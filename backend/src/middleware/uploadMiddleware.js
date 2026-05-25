const multer = require("multer");
const path = require("path");


// STORAGE CONFIG
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});


// FILE FILTER
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/JPG/PNG files allowed"));
  }
};


const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;