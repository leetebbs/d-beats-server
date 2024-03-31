const { db, DBManager } = require("../db/db.js");
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

      // Create a new user document in WeaveDB
      const user = await db.set(
        {
          walletAddress,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        "users",
        walletAddress
      );

      return user;
    } catch (err) {
      throw err;
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
