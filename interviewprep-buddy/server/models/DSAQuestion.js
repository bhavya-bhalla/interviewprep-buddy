const mongoose = require("mongoose");

const dsaQuestionSchema = new mongoose.Schema({
  title: String,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("DSAQuestion", dsaQuestionSchema);
