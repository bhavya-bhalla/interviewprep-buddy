const CompanyApplication = require("../models/CompanyApplication");

exports.createApplication = async (req, res) => {
  const { companyName, role, status, link } = req.body;
  const app = await CompanyApplication.create({
    user: req.user._id,
    companyName,
    role,
    status,
    link
  });
  res.status(201).json(app);
};

exports.getApplications = async (req, res) => {
  const apps = await CompanyApplication.find({ user: req.user._id });
  res.json(apps);
};

exports.updateApplication = async (req, res) => {
  const updated = await CompanyApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteApplication = async (req, res) => {
  await CompanyApplication.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
