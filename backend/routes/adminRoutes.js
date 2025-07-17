const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middleware/authenticateAdmin');

// Admin login route
router.post('/login', adminController.login); // Controllers/adminController.js

// Admin dashboard route (protected)
router.get('/dashboard', authenticateAdmin, adminController.getDashboard);

// Fetch all allocations route (protected)
router.get('/allocations', authenticateAdmin, adminController.getAllocations);

module.exports = router;
