const db = require("../db/db.js");

const artistService = {
 async submitArtistApplication(userId, twitterHandle, verificationStatus) {
    try {
      const data = { userId, twitterHandle ,verificationStatus:"pending"}; // Corrected key names
      // Assuming 'owner' is defined elsewhere or passed as an argument
      const tx = await db.setArtistApplicationData(data, "artists", owner);
      if (tx) {
        console.log("success");
      } else {
        console.log("failed",tx);
      }
    } catch (error) {
      console.error(error); // Log the original error
      throw new Error(`Error submitting artist application: ${error.message}`);
    }
 },
 async getPendingApplications() {
    try {
      const pendingApplications = await db.getPendingArtistApplications();
      return pendingApplications;
    } catch (error) {
      throw new Error(`Error fetching pending artist applications: ${error.message}`);
    }
 },
 async approveArtist(userId) {
    try {
      await db.updateUserRole(userId, "artist");
    } catch (error) {
      throw new Error(`Error approving artist: ${error.message}`);
    }
 },
};

module.exports = artistService;
