const { body, validationResult } = require("express-validator");

const validateDSAInput = [
  body("title").notEmpty().withMessage("Title is required"),
  body("status").isIn(["Pending", "Solved"]).withMessage("Invalid status"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateHRInput = [
  body("question").notEmpty().withMessage("Question is required"),
  body("answer").notEmpty().withMessage("Answer is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCompanyInput = [
  body("company").notEmpty().withMessage("Company name is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("status").isIn(["Applied", "Interview", "Rejected", "Offer"])
    .withMessage("Invalid status"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateDSAInput, validateHRInput, validateCompanyInput };
