const multer = require('multer');
const path = require('path');

// Where to store files and what to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Validate file type and size
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (ext) {
    cb(null, true);
  } else {
    cb(new Error('Only images, PDFs and docs are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

module.exports = upload;