const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();

//importing the abi
const factoryAbi = require("./abi/factoryAbi.json");
const marketplaceAbi = require("./abi/marketplaceAbi.json");
const factoryAddress = "0x036E9Ba2FF01F2C6452B8fcd11c26B67534F73B4";
const marketplaceAddress = "0x306F0d6247760e23A91acD6E088bE593D1D0Bf9C";
const wssProvider = new ethers.providers.WebSocketProvider(
  `wss://arb-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ARB_SEPOLIA_KEY}`
);
const provider = new ethers.providers.WebSocketProvider(
  `wss://arb-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ARB_SEPOLIA_KEY}`
);
//importing the routes
const routes = require("./routes.js");
const artistRoutes = require("./artists/artists.routes.js");
const uploadRoutes = require("./uploads/uploads.routes.js");
const nftsRoutes = require("./nfts/nfts.routes.js");

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes
app.use("/", routes);
app.use("/artists", artistRoutes);
app.use("/uploads", uploadRoutes);
app.use("/nfts", nftsRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to D-Beat backend!");
});

//factory listener
async function factoryListener() {
  const Fcontract = new ethers.Contract(factoryAddress, factoryAbi, wssProvider);
 
  Fcontract.on("NewNFT", (nftAddress, _initialOwner, _artistAddress, _newTokenURI, _mintAmount, name, symbol, event) => {
     let info = {
       nftAddress: nftAddress,
       initialOwner: _initialOwner,
       artistAddress: _artistAddress,
       newTokenURI: _newTokenURI,
       mintAmount: _mintAmount,
       name: name,
       symbol: symbol,
       data: event,
     }
 
     console.log(JSON.stringify(info, null, 8));
  });
 }
 
factoryListener();

//marketplace listener
async function marketplaceListener() {
  const Mcontract = new ethers.Contract(marketplaceAddress, marketplaceAbi, wssProvider);
 //Listen to items listed event
  Mcontract.on("ItemListed", (nftAddress, tokenId, price, event) => {
     let info = {
       nftAddress: nftAddress,
       tokenId: tokenId,
       price: price,
       data: event,
     }
 
     console.log(JSON.stringify(info, null, 8));
  });

  //Listen to items canceled event
  Mcontract.on("ItemCanceled", (nftAddress, tokenId, event) => {
     let info = {
       nftAddress: nftAddress,
       tokenId: tokenId,
       data: event,
     }
 
     console.log(JSON.stringify(info, null, 8));
  });

  //Listen to items bought event
  Mcontract.on("ItemBought", (nftAddress, tokenId, buyer, price, event) => {
     let info = {
       nftAddress: nftAddress,
       tokenId: tokenId,
       buyer: buyer,
       price: price,
       data: event,
     }
 
     console.log(JSON.stringify(info, null, 8));
  });
 }
 
marketplaceListener();

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { factoryContract, marketplaceContract };
