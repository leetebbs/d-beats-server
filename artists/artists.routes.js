const express = require("express");
const artistController = require("./artists.controller.js");

const router = express.Router();

// Artist application submission route
router.post("/apply", artistController.submitApplication);
router.get("/getArtists", artistController.getArtists);
// Artist application review route (for admin/moderator)
router.get("/review", artistController.reviewApplications);
router.post("/review/:userId", artistController.approveArtist);

module.exports = router;
