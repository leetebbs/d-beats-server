const uploadService = require("./uploads.service.js");

const uploadController = {
  async uploadMusic(req, res) {
    try {
      const { artistId, title, description, image, price } = req.body;
      const musicFile = req.file.buffer.toString("base64");

      await uploadService.storeTrackMetadata(
        artistId,
        title,
        description,
        image,
        musicFile,
        price
      );

      res.status(200).json({ message: "Music uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = uploadController;
