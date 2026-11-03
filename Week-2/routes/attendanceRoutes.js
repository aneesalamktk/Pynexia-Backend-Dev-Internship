const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");

router.post("/check-in", controller.checkIn);
router.post("/check-out", controller.checkOut);
router.get("/today", controller.getTodayAttendance);
router.get("/history", controller.getAttendanceHistory);

module.exports = router;
