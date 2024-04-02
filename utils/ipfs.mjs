import { json } from "@helia/json";
import { dagJson } from "@helia/dag-json";
import { createHelia } from "helia";

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
