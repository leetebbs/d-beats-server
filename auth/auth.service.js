const { db } = require("../db/db.js");
const jwt = require("jsonwebtoken");

class AuthService {
  async registerUser(walletAddress) {
    try {
      // Check if the user already exists
      const existingUser = await db.get("users", [
        "walletAddress",
        "==",
        walletAddress,
      ]);
      if (existingUser.length > 0) {
        throw new Error("User already registered");
      }
      if (!walletAddress) {
        throw new Error("Wallet address is required");
      }

      // Create a new user document in WeaveDB
      await db.add({ walletAddress, role: "user" }, "User");
      return { walletAddress, role: "user" };
    } catch (err) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }

  async loginUser(walletAddress) {
    try {
      // Find the user by wallet address
      const user = await db.get("users", [
        "walletAddress",
        "==",
        walletAddress,
      ]);
      if (user.length === 0) {
        throw new Error("Invalid wallet address");
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return token;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthService;
