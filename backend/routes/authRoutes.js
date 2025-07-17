const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register); // Register Student/Admin
router.post("/login", login); // Login Student/Admin

module.exports = router;
