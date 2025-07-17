const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, studentId, regNo, department, series, password, role } = req.body;

    // Validate all required fields
    if (!name || !email || !studentId || !regNo || !department || !series || !password) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Check if user exists by email or studentId
    const existingUser = await User.findOne({
      $or: [{ email: email }, { studentId: studentId }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email or student ID already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      studentId,
      regNo,
      department,
      series,
      password: hashedPassword,
      role: role || "student",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { studentId, regNo } = req.body;

    if (!studentId || !regNo) {
      return res.status(400).json({ message: "Please provide Student ID and Registration No." });
    }

    const user = await User.findOne({ studentId, regNo });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // No password check? Add if you want password auth

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token, role: user.role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
