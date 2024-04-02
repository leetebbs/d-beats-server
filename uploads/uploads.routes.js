const express = require("express");
const multer = require("multer");
const { uploadMusicController } = require("./uploads.controller.js");

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadMusicController);

module.exports = router;
