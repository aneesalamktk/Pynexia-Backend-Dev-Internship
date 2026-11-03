const mongoose = require("mongoose");
const Task = require("../models/Task");
const validId = (id) => mongoose.isValidObjectId(id);

async function createTask(req, res, next) {
  try {
    const { title, description, status } = req.body;
    if (typeof title !== "string" || !title.trim())
      return res.status(400).json({ message: "A non-empty title is required." });
    if (description !== undefined && typeof description !== "string")
      return res.status(400).json({ message: "Description must be a string." });
    if (status !== undefined && !["pending", "completed"].includes(status))
      return res.status(400).json({ message: 'Status must be "pending" or "completed".' });

    const task = await Task.create({
      title: title.trim(),
      description: description === undefined ? "" : description.trim(),
      status: status || "pending"
    });
    res.status(201).json({ message: "Task created successfully.", task });
  } catch (error) { next(error); }
}

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ count: tasks.length, tasks });
  } catch (error) { next(error); }
}

async function getTaskById(req, res, next) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid task ID." });
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.status(200).json({ task });
  } catch (error) { next(error); }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!validId(id)) return res.status(400).json({ message: "Invalid task ID." });
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ message: "Provide at least one field to update." });
    if (title !== undefined && (typeof title !== "string" || !title.trim()))
      return res.status(400).json({ message: "Title must be a non-empty string." });
    if (description !== undefined && typeof description !== "string")
      return res.status(400).json({ message: "Description must be a string." });
    if (status !== undefined && !["pending", "completed"].includes(status))
      return res.status(400).json({ message: 'Status must be "pending" or "completed".' });

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (status !== undefined) updates.status = status;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) { next(error); }
}

async function completeTask(req, res, next) {
  try {
    const { id } = req.params;
    if (!validId(id)) return res.status(400).json({ message: "Invalid task ID." });
    const task = await Task.findByIdAndUpdate(id, { status: "completed" }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.status(200).json({ message: "Task marked as completed.", task });
  } catch (error) { next(error); }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    if (!validId(id)) return res.status(400).json({ message: "Invalid task ID." });
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.status(200).json({ message: "Task deleted successfully.", task });
  } catch (error) { next(error); }
}

module.exports = { createTask, getTasks, getTaskById, updateTask, completeTask, deleteTask };
