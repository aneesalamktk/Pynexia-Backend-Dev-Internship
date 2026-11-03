const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true, minlength: 2 },
  email: {
    type: String, required: [true, "Email is required"], unique: true,
    lowercase: true, trim: true, match: [/^\\S+@\\S+\\.\\S+$/, "Enter a valid email"]
  },
  department: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
