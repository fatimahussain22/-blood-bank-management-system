const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- ROUTE FILE CHECK ---
console.log("📁 Current folder:", __dirname);
if (fs.existsSync(path.join(__dirname, "routes", "donorRoutes.js"))) {
  console.log("✅ donorRoutes.js file FOUND!");
} else {
  console.log("❌ donorRoutes.js file NOT found! Check path carefully!");
}

// --- IMPORT ROUTES ---
const donorRoutes = require(path.resolve(__dirname, "routes", "donorRoutes.js"));
app.use("/donor", donorRoutes);
console.log("✅ donorRoutes mounted successfully");

// --- DATABASE CONNECTION ---
mongoose.connect(
  "mongodb+srv://fatimaatlas:fatimaatlas@cluster0.ltob72e.mongodb.net/bloodBank?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- START SERVER ---
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});





