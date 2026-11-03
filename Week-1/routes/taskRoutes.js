const express = require("express");
const {
  createTask, getTasks, getTaskById, updateTask, completeTask, deleteTask
} = require("../controllers/taskController");

const router = express.Router();
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.patch("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;
