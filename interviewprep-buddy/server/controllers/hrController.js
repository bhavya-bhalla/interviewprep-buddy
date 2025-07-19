const HRAnswer = require("../models/HRAnswer");

exports.createAnswer = async (req, res) => {
  const { question, answer, tags } = req.body;
  const note = await HRAnswer.create({ user: req.user._id, question, answer, tags });
  res.status(201).json(note);
};

exports.getAnswers = async (req, res) => {
  const answers = await HRAnswer.find({ user: req.user._id });
  res.json(answers);
};

exports.updateAnswer = async (req, res) => {
  const updated = await HRAnswer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteAnswer = async (req, res) => {
  await HRAnswer.findByIdAndDelete(req.params.id);
  res.json({ message: "Answer deleted" });
};
