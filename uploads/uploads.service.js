const { DBManager } = require("../db/db.js");

const uploadMusic = async (musicData) => {
  try {
    const createIPFSClient = await import("../utils/ipfs.mjs");
    const { jsonStore, dagJsonStore } = await createIPFSClient();
    const cid = await jsonStore.add(musicData.file.buffer);

    const music = {
      title: musicData.title,
      description: musicData.description,
      image: "",
      ipfsCID: cid,
      price: musicData.price,
      artistId: musicData.artistId,
      saleStatus: "onSale",
    };

    await DBManager.storeMusic(music);

    return cid;
  } catch (error) {
    throw new Error(`Error uploading music: ${error.message}`);
  }
};

module.exports = { uploadMusic };
