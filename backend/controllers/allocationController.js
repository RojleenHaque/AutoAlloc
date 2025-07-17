// allocationController.js
const Allocation = require("../models/Allocation");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "signature", maxCount: 1 },
]);
const hallConfigs = {
  "Shahid Lt. Selim Hall": { floors: 3, roomsPerFloor: 40 },
  "Shahid Shahidul Islam Hall": { floors: 4, roomsPerFloor: 19 },
  "Shahid Abdul Hamid Hall": { floors: 4, roomsPerFloor: 19 },
  "Tin Shed Hall": { floors: 1, roomsPerFloor: 33 },
  "Deshratna Sheikh Hasina Hall": { floors: 5, roomsPerFloor: 15 },
  "Bangabandhu Sheikh Mujibur Rahman Hall": { floors: 4, roomsPerFloor: 21 },
  "Shahid President Ziaur Rahman Hall": { floors: 5, roomsPerFloor: 32 },
};



const submitChoice = async (req, res) => {
  try {
    const profilePhotoFile = req.files?.profilePhoto?.[0] || null;
    const signatureFile = req.files?.signature?.[0] || null;

    let hasRelativeBoolean = false;
    if (req.body.hasRelative) {
      const val = req.body.hasRelative.toLowerCase();
      hasRelativeBoolean = val === "yes" || val === "true";
    }

    const hallName = req.body.hallChoice;
    let allocatedRoom = null;

    if (hallConfigs[hallName]) {
      const { floors, roomsPerFloor } = hallConfigs[hallName];
      let attempt = 0;
      let assigned = false;

      while (attempt < 10 && !assigned) {  // Try max 10 times
        // Generate random room number
        const floorDigit = Math.floor(Math.random() * floors) + 1;
        const roomNumber = (Math.floor(Math.random() * roomsPerFloor) + 1).toString().padStart(2, "0");
        const roomLabel = `${floorDigit}${roomNumber}`;

        // Check how many students already assigned this room
        const count = await Allocation.countDocuments({
          hallChoice: hallName,
          allocatedRoom: roomLabel,
        });

        if (count < 3) {
          allocatedRoom = roomLabel;
          assigned = true;
        } else {
          attempt++;
        }
      }

      // Fallback if unable to assign in 10 tries, assign any room (even if full)
      if (!assigned) {
        const floorDigit = Math.floor(Math.random() * floors) + 1;
        const roomNumber = (Math.floor(Math.random() * roomsPerFloor) + 1).toString().padStart(2, "0");
        allocatedRoom = `${floorDigit}${roomNumber}`;
      }
    } else {
      // fallback for unknown hall
      allocatedRoom = Math.floor(Math.random() * 900) + 100;
    }

    const allocationData = {
      ...req.body,
      hasRelative: hasRelativeBoolean,
      allocatedRoom,
      profilePhoto: profilePhotoFile
        ? `data:${profilePhotoFile.mimetype};base64,${profilePhotoFile.buffer.toString("base64")}`
        : null,
      signature: signatureFile
        ? `data:${signatureFile.mimetype};base64,${signatureFile.buffer.toString("base64")}`
        : null,
      status: "pending",
    };

    const allocation = new Allocation(allocationData);
    await allocation.save();

    res.status(201).json(allocation);
  } catch (error) {
    console.error("Submit Choice Error:", error);
    res.status(500).json({ message: "Error submitting allocation form" });
  }
};


const getAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.find({});
    res.json(allocations);
  } catch (error) {
    console.error("Get Allocations Error:", error);
    res.status(500).json({ message: "Error fetching allocations" });
  }
};

const getAllocationResult = async (req, res) => {
  const { studentId } = req.params;

  try {
    const allocation = await Allocation.findOne({ studentId });

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    res.json({
      _id: allocation._id,
      studentId: allocation.studentId,
      name: allocation.name,
      email: allocation.email,
      department: allocation.department,
      hallChoice: allocation.hallChoice,
      allocatedRoom: allocation.allocatedRoom,
      fatherName: allocation.fatherName,
      motherName: allocation.motherName,
      nativeAddress: allocation.nativeAddress,
      section: allocation.section,
      hasRelative: allocation.hasRelative,
      profilePhoto: allocation.profilePhoto,
      signature: allocation.signature,
      status: allocation.status,
    });
  } catch (error) {
    console.error("Get Allocation Result Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAllocationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const allocation = await Allocation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    res.json(allocation);
  } catch (error) {
    console.error("Update Allocation Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  submitChoice,
  getAllocations,
  getAllocationResult,
  updateAllocationStatus,
  upload,
};

