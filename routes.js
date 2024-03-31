const express = require("express");
const AuthService = require("./auth/auth.service.js");

const router = express.Router();
const authService = new AuthService();

router.get("/", (req, res) => {
  res.send("Welcome to D-Beat backend!");
});

router.post("/auth/register", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await authService.registerUser(walletAddress);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const token = await authService.loginUser(walletAddress);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
