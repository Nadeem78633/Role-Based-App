const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const dashboardRoutes = require("./routes/dashboard.js");
const connectDb = require("./config/db.js");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
