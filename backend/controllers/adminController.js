const jwt = require('jsonwebtoken');
const Allocation = require('../models/Allocation'); // Assuming the Allocation model is already set up

// Fixed Admin credentials (For demonstration purposes)
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123'; // In production, hash the password for security

// Admin login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ email: ADMIN_EMAIL }, 'your_jwt_secret', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
};

// Fetch all allocation results (admin dashboard)
exports.getDashboard = async (req, res) => {
  try {
    const allocationResults = await Allocation.find(); // Assuming you're fetching all allocations
    res.status(200).json(allocationResults);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching allocation results', error: err });
  }
};

// Fetch all allocations route
exports.getAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.find();
    res.status(200).json(allocations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

