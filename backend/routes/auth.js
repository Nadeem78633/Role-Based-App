const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role, // e.g., 'admin', 'editor', 'viewer'
    });

    await newUser.save();

    // Generate a token (optional)
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, role: newUser.role });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  
  // If user is not found or password does not match, return an error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token with user ID and role
  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
    expiresIn: "1h",
  });

  // Send both the token and the user's role in the response
  res.json({ token, role: user.role });
});



module.exports = router;
