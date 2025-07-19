const DSAQuestion = require("../models/DSAQuestion");

exports.createQuestion = async (req, res) => {
  const { topic, question, link, status } = req.body;
  try {
    const newQuestion = await DSAQuestion.create({
      user: req.user._id,
      topic,
      question,
      link,
      status
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: "Failed to add question" });
  }
};

exports.getAllQuestions = async (req, res) => {
  const questions = await DSAQuestion.find({ user: req.user._id });
  res.json(questions);
};

exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const updated = await DSAQuestion.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteQuestion = async (req, res) => {
  await DSAQuestion.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
