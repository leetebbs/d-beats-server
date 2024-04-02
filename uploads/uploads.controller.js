const { uploadMusic } = require("./uploads.service.js");

const uploadMusicController = async (req, res) => {
  try {
    const cid = await uploadMusic(req.body);
    res.status(200).json({ success: true, cid });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { uploadMusicController };
