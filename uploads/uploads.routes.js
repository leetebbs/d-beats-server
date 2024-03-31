const express = require("express");
const uploadController = require("./uploads.controller.js");

const router = express.Router();

// Music upload route
router.post("/music", uploadController.uploadMusic);

module.exports = router;
