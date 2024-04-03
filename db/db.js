const WeaveDB = require("weavedb-sdk-node");

//Initialize WeaveDB
const db = new WeaveDB({ contractTxId: process.env.REACT_APP_CONTRACT_TX_ID });
(async () => {
  await db.init();
})();

class DBManager {
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
