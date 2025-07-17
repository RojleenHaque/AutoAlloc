const mongoose = require("mongoose");

const AllocationSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  series: { type: String, required: true },
  hallChoice: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  nativeAddress: { type: String, required: true },
  section: { type: String, required: true },
  hasRelative: { type: Boolean, required: true },
  profilePhoto: { type: String, default: null },
  signature: { type: String, default: null },
  allocatedRoom: { type: String, default: null },
  status: {
    type: String,
    enum: ["pending", "accepted", "denied"],
    default: "pending",
  },
});

const Allocation = mongoose.model("Allocation", AllocationSchema);
module.exports = Allocation;
