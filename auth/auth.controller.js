import authService from "./auth.service.js";

const register = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await authService.registerUser(walletAddress);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const token = await authService.loginUser(walletAddress);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };
