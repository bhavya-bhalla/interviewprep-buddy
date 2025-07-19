// server/routes/hr.js
const express = require("express");
const router = express.Router();
const HRAnswer = require("../models/HRAnswer"); // You named it HRAnswer.js
const { protect } = require("../middlewares/authMiddleware");
const { validateHRInput } = require("../middlewares/validationMiddleware");

// Create HR Note
router.post("/", protect, validateHRInput, async (req, res) => {
  try {
    const note = await HRAnswer.create({
      question: req.body.question,
      answer: req.body.answer,
      user: req.user._id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get HR Notes
router.get("/", protect, async (req, res) => {
  try {
    const notes = await HRAnswer.find({ user: req.user._id }).sort("-createdAt");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete HR Note
router.delete("/:id", protect, async (req, res) => {
  try {
    const note = await HRAnswer.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
