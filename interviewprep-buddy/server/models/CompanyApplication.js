const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Online Test", "Interview", "Selected", "Rejected"],
    default: "Applied",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("CompanyApplication", companySchema);
