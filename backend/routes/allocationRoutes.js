

const express = require("express");
const {
  submitChoice,
  getAllocations,
  getAllocationResult,
  updateAllocationStatus,
  upload,
} = require("../controllers/allocationController");
const authenticateAdmin = require("../middleware/authenticateAdmin");

const router = express.Router();

// Student submits allocation form
router.post("/submit-choice", upload, submitChoice);

// Admin: Get all allocations
router.get("/admin/allocations", authenticateAdmin, getAllocations);

// Get allocation result by studentId (public)
router.get("/allocation-result/:studentId", getAllocationResult);

// Admin: Update allocation status
router.patch("/admin/allocations/:id", authenticateAdmin, updateAllocationStatus);

module.exports = router;
