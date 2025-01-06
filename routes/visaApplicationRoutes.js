const express = require('express');
const router = express.Router();
const VisaApplication = require('../models/VisaApplication');

// Submit a new visa application
router.post('/', async (req, res) => {
  const {country, countryImage, visaType, processingTime, validity, applicationMethod, firstName, lastName, email, appliedDate, fee, visaId } = req.body;

  try {
    const newApplication = new VisaApplication({
      country,
      countryImage,
      visaType,
      processingTime,
      validity,
      applicationMethod,
      firstName,
      lastName,
      email,
      appliedDate,
      fee,
      visaId,
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error submitting visa application:', error);
    res.status(500).json({ message: 'Failed to submit visa application.' });
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query; // Extract email from query parameters
    if (!email) {
      return res.status(400).json({ error: "Email query parameter is required" });
    }
    // Query the database for applications that match the provided email
    const applications = await VisaApplication.find({ email });
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch applications" });
  }
});


// Delete visa application
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await VisaApplication.findByIdAndDelete(id);
    res.json({ message: "Application canceled" });
  } catch (error) {
    res.status(400).json({ error: "Failed to cancel application" });
  }
});

module.exports = router;
