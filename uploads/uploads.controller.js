const uploadService = require("./uploads.service.js");

const uploadController = {
  async uploadMusic(req, res) {
    try {
      const { artistId, title, description, image, price } = req.body;
      const musicFile = req.file;

      const ipfsCid = await uploadService.storeOnIPFS(musicFile);
      await uploadService.storeMetadataInWeaveDB(
        artistId,
        title,
        description,
        image,
        ipfsCid,
        price
      );

      res.status(200).json({ message: "Music uploaded successfully", ipfsCid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = uploadController;
