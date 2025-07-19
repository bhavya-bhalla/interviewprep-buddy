const express = require("express");
const router = express.Router();
const DSAQuestion = require("../models/DSAQuestion");
const { protect } = require("../middlewares/authMiddleware");
const { validateDSAInput } = require("../middlewares/validationMiddleware");

// Create DSA Question
router.post("/", protect, validateDSAInput, async (req, res) => {
  try {
    const newQuestion = await DSAQuestion.create({
      title: req.body.title,
      status: req.body.status,
      user: req.user._id,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User's DSA Questions
router.get("/", protect, async (req, res) => {
  try {
    const questions = await DSAQuestion.find({ user: req.user._id }).sort("-createdAt");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a DSA Question
router.delete("/:id", protect, async (req, res) => {
  try {
    const question = await DSAQuestion.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!question) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
