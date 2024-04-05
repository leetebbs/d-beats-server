const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();
var WeaveDB = require('weavedb-sdk-node');

const nftsService = require("./nfts/nfts.service.js");

//importing the abi
const factoryAbi = require("./abi/factoryAbi.json");
const marketplaceAbi = require("./abi/marketplaceAbi.json");
const factoryAddress = "0x036E9Ba2FF01F2C6452B8fcd11c26B67534F73B4";
const marketplaceAddress = "0x4690C5d846Abb49d0b6B2a04D4aa3B16e4aFC287"; 
// const marketplaceAddress = "0x306F0d6247760e23A91acD6E088bE593D1D0Bf9C"; 
const wallet = {
  getAddressString: () => process.env.ADMIN_ADDRESS.toLowerCase(),
  getPrivateKey: () => Buffer.from(process.env.ADMIN_PRIVATE_KEY, "hex"),
};
let db;
global.owner = process.env.ADMIN_ADDRESS;
// Initialize WeaveDB
async function init() {
  db = new WeaveDB({ contractTxId: process.env.CONTRACT_TX_ID });
  await db.initializeWithoutWallet();
  db.setDefaultWallet(wallet, "evm");
}

init();
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

// endpoint to fetch all nfts minted
app.get("/allNfts", async (req, res) => {
  const result = await db.get("nfts");
  res.status(200).json(result);
})

//factory listener
async function factoryListener() {
<<<<<<< HEAD
  const Fcontract = new ethers.Contract(
    factoryAddress,
    factoryAbi,
    wssProvider
  );

  Fcontract.on(
    "NewNFT",
    async (
      nftAddress,
      _initialOwner,
      _artistAddress,
      _newTokenURI,
      _mintAmount,
      name,
      symbol,
      event
    ) => {
      let info = {
=======
  const Fcontract = new ethers.Contract(factoryAddress, factoryAbi, wssProvider);
  
  Fcontract.on("NewNFT", async (nftAddress, _initialOwner, _artistAddress, _newTokenURI, _mintAmount, name, symbol, event) => {
      let Data = {
>>>>>>> a33f984bee9215901b53977d5c5c3c9c9c4b92b8
        nftAddress: nftAddress,
        initialOwner: _initialOwner,
        artistAddress: _artistAddress,
        newTokenURI: _newTokenURI,
<<<<<<< HEAD
        mintAmount: _mintAmount,
        name: name,
        symbol: symbol,
        data: event,
      };

      // store this info in the database when to event is triggered
      try {
        await nftsService.storeNFTData(info);
        console.log("NFT data stored successfully");
      } catch (error) {
        console.error("Error storing NFT data:", error.message);
      }
      console.log(JSON.stringify(info, null, 8));
    }
  );
}

=======
        mintAmount: parseInt(_mintAmount),
        name: name,
        symbol: symbol,
        // data: event,
      };
      console.log(JSON.stringify(Data, null, 8));
 try{
      const tx = await db.add(Data, "nfts");
      console.log("tx", tx);
      const result = await db.get("nfts");
      console.log("result", result);
 }catch (error) {
   console.log("error", error);
 }
  });
 }
 
>>>>>>> a33f984bee9215901b53977d5c5c3c9c9c4b92b8
factoryListener();

//marketplace listener
async function marketplaceListener() {
  const Mcontract = new ethers.Contract(
    marketplaceAddress,
    marketplaceAbi,
    wssProvider
  );
  //Listen to items listed event
  Mcontract.on("ItemListed", (nftAddress, tokenId, price, event) => {
    let info = {
      nftAddress: nftAddress,
      tokenId: tokenId,
      price: price,
      data: event,
    };
    // we need to store this info in the database when to event is triggered
    console.log(JSON.stringify(info, null, 8));
  });

  //Listen to items canceled event
  Mcontract.on("ItemCanceled", (nftAddress, tokenId, event) => {
    let info = {
      nftAddress: nftAddress,
      tokenId: tokenId,
      data: event,
    };
    // we need to store this info in the database when to event is triggered
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
    };
    // we need to store this info in the database when to event is triggered
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
