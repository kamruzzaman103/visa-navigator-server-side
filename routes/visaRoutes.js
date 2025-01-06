const express = require("express");
const router = express.Router();
const Visa = require("../models/Visa"); // Assuming Visa schema is defined

// Fetch the latest visas
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit
    const visas = await Visa.find().sort({ createdAt: -1 }).limit(limit);
    res.json(visas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch visas", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const visa = new Visa(req.body);
    await visa.save();
    res.status(201).json({ message: "Visa added successfully!", visa });
  } catch (error) {
    res.status(500).json({ message: "Failed to add visa", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const visas = await Visa.find();
    res.status(200).json(visas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch visas", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedVisa = await Visa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVisa);
  } catch (error) {
    res.status(500).json({ message: "Failed to update visa", error });
  }
});

// Delete a visa
router.delete("/:id", async (req, res) => {
  try {
    await Visa.findByIdAndDelete(req.params.id);
    res.json({ message: "Visa deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete visa", error });
  }
});

module.exports = router;
