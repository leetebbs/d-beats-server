const WeaveDB = require("weavedb-sdk-node");
require('dotenv').config(); // Correctly load environment variables

const wallet = {
 getAddressString: () => process.env.ADMIN_ADDRESS.toLowerCase(),
 getPrivateKey: () => Buffer.from(process.env.ADMIN_PRIVATE_KEY, "hex"),
};

let db; // Define db outside of the init function
const ownerAddress = process.env.ADMIN_ADDRESS; // Replace with the actual owner's address

// Set the owner as a global variable
global.owner = ownerAddress;
// Initialize WeaveDB
async function init() {
 db = new WeaveDB({ contractTxId: process.env.CONTRACT_TX_ID });
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

 // Other methods...
}

module.exports = DBManager;
