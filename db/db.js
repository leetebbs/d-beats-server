const WeaveDB = require("weavedb-sdk-node");
require("dotenv").config(); // Correctly load environment variables

const wallet = {
  getAddressString: () => process.env.REACT_APP_ADMIN_ADDRESS.toLowerCase(),
  getPrivateKey: () =>
    Buffer.from(process.env.REACT_APP_ADMIN_PRIVATE_KEY, "hex"),
};

let db; // Define db outside of the init function
const ownerAddress = process.env.REACT_APP_ADMIN_ADDRESS; // Replace with the actual owner's address

// Set the owner as a global variable
global.owner = ownerAddress;
// Initialize WeaveDB
async function init() {
  db = new WeaveDB({ contractTxId: process.env.REACT_APP_CONTRACT_TX_ID });
  await db.initializeWithoutWallet();
  db.setDefaultWallet(wallet, "evm");
}

init();

class DBManager {
  static async setArtistApplicationData(userId, twitterHandle) {
    try {
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

module.exports = { DBManager, db };
