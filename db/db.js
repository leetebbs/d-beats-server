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

  static async createDocument(collectionName, data) {
    try {
      await db.createDocument(collectionName, data);
    } catch (error) {
      throw new Error(`Error creating document in WeaveDB: ${error.message}`);
    }
  }

  static async queryDocuments(collectionName, query) {
    try {
      const documents = await db.queryDocuments(collectionName, query);
      return documents;
    } catch (error) {
      throw new Error(`Error querying documents in WeaveDB: ${error.message}`);
    }
  }
}

module.exports = DBManager;
