import multer from "multer";
import path from "path";

// Define where and how to store the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/"); // Specify the folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename based on timestamp
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject the file
  }
};

// Configure multer to use storage and fileFilter
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
