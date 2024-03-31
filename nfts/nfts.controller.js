const { factoryContract, marketplaceContract } = require("../index.js");

//Factory endpoints
const createNFT = async (req, res) => {
  try {
    const { initialOwner, artistAddress, metadata, mintAmount, name, symbol } =
      req.body;
    const tx = await factoryContract.createNFT(
      initialOwner,
      artistAddress,
      metadata,
      mintAmount,
      name,
      symbol
    );
    await tx.wait();
    res.status(201).json({ message: "NFT created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNFTsByCreator = async (req, res) => {
  try {
    const { address } = req.params;
    const nftAddresses = await factoryContract.getNFTsByCreator(address);
    res.status(200).json(nftAddresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Marketplace endpoints
const listNFT = async (req, res) => {
  try {
    const { nftAddress, tokenId, price } = req.body;
    const tx = await marketplaceContract.listItem(nftAddress, tokenId, price, {
      value: price,
    });
    await tx.wait();
    res.status(200).json({ message: "NFT listed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelNFTListing = async (req, res) => {
  try {
    const { nftAddress, tokenId } = req.params;
    const tx = await marketplaceContract.cancelListing(nftAddress, tokenId);
    await tx.wait();
    res.status(200).json({ message: "NFT listing canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buyNFT = async (req, res) => {
  try {
    const { nftAddress, tokenId } = req.params;
    const tx = await marketplaceContract.buyItem(nftAddress, tokenId, {
      value: price,
    });
    await tx.wait();
    res.status(200).json({ message: "NFT purchased successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNFTPrice = async (req, res) => {
  try {
    const { nftAddress, tokenId } = req.params;
    const price = await marketplaceContract.getPrice(nftAddress, tokenId);
    res.status(200).json({ price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNFT,
  getNFTsByCreator,
  listNFT,
  cancelNFTListing,
  buyNFT,
  getNFTPrice,
};
