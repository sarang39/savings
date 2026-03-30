const multer = require("multer");
const { cloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryconfig");
const fs = require("fs");
const Path = require("path");
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png", "gif"]
});
const upload = multer({ storage: storage });
