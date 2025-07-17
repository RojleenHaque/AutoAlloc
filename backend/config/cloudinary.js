const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from the /env folder
dotenv.config(
 // { path: path.resolve(__dirname, "../env") }
);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
