const { factoryContract, marketplaceContract } = require("../index.js");

class NFTService {
  async storeNFTData(nftData) {
    try {
      await DBManager.createDocument("nfts", nftData);
    } catch (error) {
      throw new Error(`Error storing NFT data: ${error.message}`);
    }
  }

  async getNFTsByArtist(artistAddress) {
    try {
      const nfts = await DBManager.queryDocuments("nfts", [
        "artistAddress",
        "==",
        artistAddress,
      ]);
      return nfts;
    } catch (error) {
      throw new Error(`Error fetching NFTs by artist: ${error.message}`);
    }
  }

  async createNFT(
    initialOwner,
    artistAddress,
    metadata,
    mintAmount,
    name,
    symbol
  ) {
    try {
      const tx = await factoryContract.createNFT(
        initialOwner,
        artistAddress,
        metadata,
        mintAmount,
        name,
        symbol
      );
      await tx.wait();
      return { message: "NFT created successfully" };
    } catch (error) {
      throw new Error(`Error creating NFT: ${error.message}`);
    }
  }

  // async getNFTsByCreator(address) {
  //   try {
  //     const nftAddresses = await factoryContract.getNFTsByCreator(address);
  //     return nftAddresses;
  //   } catch (error) {
  //     throw new Error(`Error getting NFTs by creator: ${error.message}`);
  //   }
  // }

  async listNFT(nftAddress, tokenId, price) {
    try {
      const tx = await marketplaceContract.listItem(
        nftAddress,
        tokenId,
        price,
        {
          value: price,
        }
      );
      await tx.wait();
      return { message: "NFT listed successfully" };
    } catch (error) {
      throw new Error(`Error listing NFT: ${error.message}`);
    }
  }

  async cancelNFTListing(nftAddress, tokenId) {
    try {
      const tx = await marketplaceContract.cancelListing(nftAddress, tokenId);
      await tx.wait();
      return { message: "NFT listing canceled successfully" };
    } catch (error) {
      throw new Error(`Error canceling NFT listing: ${error.message}`);
    }
  }

  async buyNFT(nftAddress, tokenId, price) {
    try {
      const tx = await marketplaceContract.buyItem(nftAddress, tokenId, {
        value: price,
      });
      await tx.wait();
      return { message: "NFT purchased successfully" };
    } catch (error) {
      throw new Error(`Error buying NFT: ${error.message}`);
    }
  }

  async getNFTPrice(nftAddress, tokenId) {
    try {
      const price = await marketplaceContract.getPrice(nftAddress, tokenId);
      return { price };
    } catch (error) {
      throw new Error(`Error getting NFT price: ${error.message}`);
    }
  }
}

module.exports = new NFTService();
