const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
