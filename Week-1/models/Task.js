const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String, required: [true, "Task title is required."], trim: true,
    minlength: [1, "Task title cannot be empty."],
    maxlength: [120, "Task title cannot exceed 120 characters."]
  },
  description: {
    type: String, trim: true, default: "",
    maxlength: [1000, "Description cannot exceed 1000 characters."]
  },
  status: {
    type: String, enum: { values: ["pending", "completed"], message: 'Status must be "pending" or "completed".' },
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
