const db = require("../db/db.js");

const uploadService = {
  async storeTrackMetadata(
    artistId,
    title,
    description,
    image,
    musicFile,
    price
  ) {
    try {
      // Store the track metadata in WeaveDB
      await db.createDocument("Music", {
        title,
        description,
        image,
        musicFile,
        price,
        artistId,
        saleStatus: "onSale",
      });
    } catch (error) {
      throw new Error(
        `Error storing track metadata in WeaveDB: ${error.message}`
      );
    }
  },
};

module.exports = uploadService;
