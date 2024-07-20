const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });
let uploadHandler = upload.single("profile");

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/qr");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const qrUpload = multer({ storage: storage2 });
let handleQrUpload = qrUpload.single("qr");

module.exports = { handleQrUpload, uploadHandler };
