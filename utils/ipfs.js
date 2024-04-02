const { createHelia } = require("helia");
const { json } = require("@helia/json");
const { dagJson } = require("@helia/dag-json");

const createIPFSClient = async () => {
  const helia = await createHelia();
  const jsonStore = json(helia);
  const dagJsonStore = dagJson(helia);

  return {
    jsonStore,
    dagJsonStore,
  };
};

module.exports = createIPFSClient;
