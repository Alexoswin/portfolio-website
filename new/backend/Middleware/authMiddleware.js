const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Login = require('../Database/Login');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //  check if user still exists
    const user = await Login.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
