const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Login = require('../Database/Login'); // adjust the path as needed
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user still exists in the database
    const user = await Login.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach decoded user info to request for use in next middleware or route
    req.user = decoded;
    console.log(decoded)

    next(); // Continue to the next middleware/route handler
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
