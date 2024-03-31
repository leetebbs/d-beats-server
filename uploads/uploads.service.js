const db = require("../db/db.js");
const ipfsClient = require("../utils/ipfs.js");

const uploadService = {
  async storeOnIPFS(musicFile) {
    try {
      const { cid } = await ipfsClient.add(musicFile);
      return cid.toString();
    } catch (error) {
      throw new Error(`Error storing file on IPFS: ${error.message}`);
    }
  },
  async storeMetadataInWeaveDB(
    artistId,
    title,
    description,
    image,
    ipfsCid,
    price
  ) {
    try {
      await db.storeTrackMetadata(
        artistId,
        title,
        description,
        image,
        ipfsCid,
        price
      );
    } catch (error) {
      throw new Error(
        `Error storing track metadata in WeaveDB: ${error.message}`
      );
    }
  },
};

module.exports = uploadService;
