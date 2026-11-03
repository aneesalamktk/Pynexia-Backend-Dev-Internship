require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pynexi_task_manager";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Pynexi Task Manager API is running", endpoints: "/api/tasks" });
});

app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON in request body." });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
}
startServer();
