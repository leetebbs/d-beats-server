const db = require("../db/db.js");

const artistService = {
  async submitArtistApplication(userId, twitterHandle) {
    try {
      // Store the artist application data in WeaveDB
      await db.setArtistApplicationData(userId, twitterHandle);
    } catch (error) {
      throw new Error(`Error submitting artist application: ${error.message}`);
    }
  },
  async getPendingApplications() {
    try {
      // Fetch the list of pending artist applications from WeaveDB
      const pendingApplications = await db.getPendingArtistApplications();
      return pendingApplications;
    } catch (error) {
      throw new Error(
        `Error fetching pending artist applications: ${error.message}`
      );
    }
  },
  async approveArtist(userId) {
    try {
      // Update the user's role to "artist" in WeaveDB
      await db.updateUserRole(userId, "artist");
    } catch (error) {
      throw new Error(`Error approving artist: ${error.message}`);
    }
  },
};

module.exports = artistService;
