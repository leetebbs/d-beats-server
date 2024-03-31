const WeaveDB = require("weavedb-sdk-node");

//Initialize WeaveDB
const db = new WeaveDB({ contractTxId: process.env.REACT_APP_CONTRACT_TX_ID });
(async () => {
  await db.init();
})();

class DBManager {
  static async setArtistApplicationData(userId, twitterHandle) {
    try {
      // Store the artist application data in WeaveDB
      await db.createDocument("Artist", {
        userId,
        twitterHandle,
        verificationStatus: "pending",
      });
    } catch (error) {
      throw new Error(`Error submitting artist application: ${error.message}`);
    }
  }

  static async getPendingArtistApplications() {
    try {
      // Fetch the list of pending artist applications from WeaveDB
      const pendingApplications = await db.queryDocuments("Artist", {
        verificationStatus: "pending",
      });
      return pendingApplications;
    } catch (error) {
      throw new Error(
        `Error fetching pending artist applications: ${error.message}`
      );
    }
  }

  static async updateUserRole(userId, role) {
    try {
      // Update the user's role in WeaveDB
      await db.updateDocument("User", { walletAddress: userId }, { role });
    } catch (error) {
      throw new Error(`Error approving artist: ${error.message}`);
    }
  }

  static async storeTrackMetadata(
    artistId,
    title,
    description,
    image,
    ipfsCid,
    price
  ) {
    try {
      // Store the track metadata in WeaveDB
      await db.createDocument("Music", {
        title,
        description,
        image,
        ipfsCID: ipfsCid,
        price,
        artistId,
        saleStatus: "onSale",
      });
    } catch (error) {
      throw new Error(
        `Error storing track metadata in WeaveDB: ${error.message}`
      );
    }
  }
}

module.exports = { db, DBManager };
