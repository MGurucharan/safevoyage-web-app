const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

console.log("➡️ Starting server.js...");

dotenv.config();

// connect to MongoDB
connectDB();

const app = express();
console.log("➡️ Express initialized");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/alerts", require("./src/routes/alertRoutes"));
app.use("/api/location", require("./src/routes/locationRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
