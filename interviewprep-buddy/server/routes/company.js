const express = require("express");
const router = express.Router();
const CompanyApplication = require("../models/CompanyApplication");
const { protect } = require("../middlewares/authMiddleware");
const { validateCompanyInput } = require("../middlewares/validationMiddleware");

// Add a new company
router.post("/", protect, validateCompanyInput, async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // 🔍 log inputs

    const company = await CompanyApplication.create({
      company: req.body.company,
      role: req.body.role,
      status: req.body.status,
      appliedDate: req.body.appliedDate || new Date(),
      user: req.user._id,
    });

    res.status(201).json(company);
  } catch (err) {
    console.error("Error while creating company:", err); // 🔥 detailed error
    res.status(500).json({ message: err.message });
  }
});


// Get all companies for user
router.get("/", protect, async (req, res) => {
  try {
    const companies = await CompanyApplication.find({ user: req.user._id }).sort("-createdAt");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a company
router.delete("/:id", protect, async (req, res) => {
  try {
    const company = await CompanyApplication.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
