const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, department, position } = req.body;
    if (!name || !email || !department || !position) {
      return res.status(400).json({ message: "Name, email, department and position are required." });
    }
    const employee = await Employee.create({ name, email, department, position });
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Email is already registered." });
    res.status(400).json({ message: "Could not create employee", error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    res.json(await Employee.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found." });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: "Invalid employee ID." });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const fields = ["name", "email", "department", "position", "isActive"];
    const updates = {};
    fields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "Provide at least one field to update." });
    }
    const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true
    });
    if (!employee) return res.status(404).json({ message: "Employee not found." });
    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Email is already registered." });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found." });
    await Attendance.deleteMany({ employee: employee._id });
    res.json({ message: "Employee and attendance history deleted." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
