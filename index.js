const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const factoryAbi = require("./abi/factoryAbi.json");
const marketplaceAbi = require("./abi/marketplaceAbi.json");
require("dotenv").config();
const routes = require("./routes.js");
const artistRoutes = require("./artists/artists.routes.js");
const uploadRoutes = require("./uploads/uploads.routes.js");

const app = express();
app.use(cors());
app.use(express.json());
// app.use("api/", routes);
// app.use("/", routes);
app.use("/artists", artistRoutes);
app.use("/uploads", uploadRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to D-Beat backend!");
});

const factoryAddress = "0x036E9Ba2FF01F2C6452B8fcd11c26B67534F73B4";
const marketplaceAddress = "0x306F0d6247760e23A91acD6E088bE593D1D0Bf9C";

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
