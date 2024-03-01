const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "upload"),
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
  },
});

const upload = multer({ storage });
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const imageUpload = (req, res, next) => {
  upload.single("imageUrl")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Project-images",
      });
      req.body.imageUrl = result.secure_url;
      fs.unlink(req.file.path, (unlinker) => {
        if (unlinker) {
          console.log("Error deleting localFiles", unlinker);
        }
      });
      next();
    } catch (error) {
      // console.log(error)
      return res
        .status(500)
        .json({ message: "Error uploading file to coudinary" });
    }
  });
};

module.exports = imageUpload;
