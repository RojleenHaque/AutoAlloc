const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true }, // Changed from 'id' to 'studentId'
  regNo: { type: String, required: true },
  department: { type: String, required: true },
  series: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
});

module.exports = mongoose.model("User", UserSchema);
