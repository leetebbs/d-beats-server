const artistService = require("./artists.service.js");

const artistController = {
  async submitApplication(req, res) {
    try {
      const { userId, twitterHandle } = req.body;
      const result =await artistService.submitArtistApplication(userId, twitterHandle);
      res
        .status(200)
        .json({ message: "Artist application submitted successfully" , result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async reviewApplications(req, res) { 
    try {
      const pendingApplications = await artistService.getPendingApplications();
      res.status(200).json(pendingApplications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async approveArtist(req, res) {
    try {
      const { userId } = req.params;
      await artistService.approveArtist(userId);
      res.status(200).json({ message: "Artist approved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = artistController;
