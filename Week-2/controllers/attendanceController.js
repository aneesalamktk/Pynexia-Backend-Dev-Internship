const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

function getTodayDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

exports.checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId) return res.status(400).json({ message: "employeeId is required." });
    const employee = await Employee.findById(employeeId);
    if (!employee || !employee.isActive) return res.status(404).json({ message: "Active employee not found." });

    const date = getTodayDate();
    const existing = await Attendance.findOne({ employee: employeeId, date });
    if (existing) return res.status(409).json({ message: "Check-in already recorded for today." });

    const attendance = await Attendance.create({ employee: employeeId, date, checkIn: new Date(), status: "Present" });
    res.status(201).json({ message: "Check-in recorded.", attendance });
  } catch (error) {
    res.status(400).json({ message: "Could not record check-in", error: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId) return res.status(400).json({ message: "employeeId is required." });
    const attendance = await Attendance.findOne({ employee: employeeId, date: getTodayDate() });
    if (!attendance) return res.status(404).json({ message: "No check-in found for today." });
    if (attendance.checkOut) return res.status(409).json({ message: "Check-out already recorded." });

    attendance.checkOut = new Date();
    attendance.status = "Completed";
    await attendance.save();
    res.json({ message: "Check-out recorded.", attendance });
  } catch (error) {
    res.status(400).json({ message: "Could not record check-out", error: error.message });
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ date: getTodayDate() })
      .populate("employee", "name email department position")
      .sort({ checkIn: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendanceHistory = async (req, res) => {
  try {
    const { employeeId, from, to } = req.query;
    const filter = {};
    if (employeeId) filter.employee = employeeId;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }
    const records = await Attendance.find(filter)
      .populate("employee", "name email department position")
      .sort({ date: -1, checkIn: -1 });
    res.json(records);
  } catch (error) {
    res.status(400).json({ message: "Could not retrieve history", error: error.message });
  }
};
