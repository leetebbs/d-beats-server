const WeaveDB = require("weavedb-sdk-node");

//Initialize WeaveDB
const db = new WeaveDB({ contractTxId: process.env.REACT_APP_CONTRACT_TX_ID });
(async () => {
  await db.init();
})();

module.exports = db;
