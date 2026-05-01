const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo, deadline } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ msg: "Title and Project ID required" });
    }

    const task = await Task.create({
      title,
      projectId,
      assignedTo: assignedTo || null,
      deadline: deadline || null,
      status: "Pending"
    });

    res.json(task);
  } catch (err) {
    console.log("CREATE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId
    }).populate("assignedTo", "name email"); // 👈 show user details

    res.json(tasks);
  } catch (err) {
    console.log("GET TASKS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.log("UPDATE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.log("DELETE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name");

    res.json(tasks);
  } catch (err) {
    console.log("GET ALL TASKS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};