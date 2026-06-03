const express = require("express");
const router = express.Router();

const Donor = require("../models/donor");

// ✅ CREATE — Add a new donor
router.post("/add", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor Added Successfully", donor });
  } catch (error) {
    console.error("Error adding donor:", error);
    res.status(500).json({ error: "Failed to add donor" });
  }
});

// ✅ READ ALL — Fetch all donors (with all fields)
router.get("/all", async (req, res) => {
  try {
    const donors = await Donor.find({}, {
      name: 1,
      age: 1,
      bloodGroup: 1,
      city: 1,
      phone: 1
    });

    console.log("Fetched donors:", donors); // Debug log

    // Convert Mongoose documents to plain objects to ensure all fields are sent
    res.status(200).json(donors.map(d => d.toObject()));
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ error: "Server error while fetching donors" });
  }
});

// ✅ UPDATE — Update donor by ID
router.put("/update/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Donor Updated Successfully", donor });
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ error: "Failed to update donor" });
  }
});

// ✅ DELETE — Delete donor by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Donor Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Failed to delete donor" });
  }
});

// ✅ STATS — Count donors by blood group
router.get("/stats", async (req, res) => {
  try {
    const result = await Donor.aggregate([
      { $group: { _id: "$bloodGroup", total: { $sum: 1 } } }
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error generating stats:", error);
    res.status(500).json({ error: "Failed to generate stats" });
  }
});

module.exports = router;


