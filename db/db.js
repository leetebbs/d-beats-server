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
      await db.upsert(
        {
          userId,
          twitterHandle,
          verificationStatus: "pending",
        },
        "Artist",
        userId
      );
    } catch (error) {
      throw new Error(`Error submitting artist application: ${error.message}`);
    }
  }

  static async getPendingArtistApplications() {
    try {
      // Fetch the list of pending artist applications from WeaveDB
      const pendingApplications = await db.get("Artist", [
        "verificationStatus",
        "==",
        "pending",
      ]);
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
      await db.update({ role }, "User", userId);
    } catch (error) {
      throw new Error(`Error approving artist: ${error.message}`);
    }
  }

  static async createDocument(collectionName, data) {
    try {
      await db.add(data, collectionName);
    } catch (error) {
      throw new Error(`Error creating document in WeaveDB: ${error.message}`);
    }
  }

  static async queryDocuments(collectionName, query) {
    try {
      const documents = await db.get(collectionName, query);
      return documents;
    } catch (error) {
      throw new Error(`Error querying documents in WeaveDB: ${error.message}`);
    }
  }

  static async storeMusic(music) {
    try {
      await db.add(music, "Music");
    } catch (error) {
      throw new Error(`Error storing music in WeaveDB: ${error.message}`);
    }
  }

  static async getMusicByArtist(artistId) {
    try {
      const music = await db.get("Music", ["artistId", "==", artistId]);
      return music;
    } catch (error) {
      throw new Error(
        `Error fetching music by artist in WeaveDB: ${error.message}`
      );
    }
  }
}

module.exports = DBManager;
