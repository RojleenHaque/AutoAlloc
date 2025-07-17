


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // No `.js` extension required in `require`
const path = require("path");
const allocationRoutes = require("./routes/allocationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes= require("./routes/adminRoutes");
//const profileRoutes = require('./routes/profileRoutes');

dotenv.config();  // Load environment variables
connectDB();  // Connect to the database

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/allocation", allocationRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/profile", allocationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
