import WeaveDB from "weavedb-sdk-node";

//Initialize WeaveDB
const db = new WeaveDB({ contractTxId: process.env.REACT_APP_CONTRACT_TX_ID });
await db.init();

export default db;
