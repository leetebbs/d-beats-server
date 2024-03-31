const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const factoryAbi = require("./abi/factoryAbi.json");
const marketplaceAbi = require("./abi/marketplaceAbi.json");
require("dotenv").config();
const routes = require("./routes.js");

const app = express();
app.use(cors());
app.use(express.json());
// app.use("api/", routes);
// app.use("/", routes);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to D-Beat backend!");
});

const factoryAddress = "0x242309090561301ff7A27a1d675f2c0dA06845FD";
const marketplaceAddress = "0x4690C5d846Abb49d0b6B2a04D4aa3B16e4aFC287";

const provider = new ethers.providers.WebSocketProvider(
  `wss://arb-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ARB_SEPOLIA_KEY}`
);

// Use ES module syntax for exporting
const factoryContract = new ethers.Contract(
  factoryAddress,
  factoryAbi,
  provider
);

const marketplaceContract = new ethers.Contract(
  marketplaceAddress,
  marketplaceAbi,
  provider
);

const PORT = process.env.REACT_APP_PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Welcome to D-Beat backend!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { factoryContract, marketplaceContract };
