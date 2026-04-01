  const Task = require("../models/task");

  // 🔹 Get All Tasks
  const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.userId })
        .sort({ createdAt: -1 });

      res.status(200).json(tasks);
    } catch (error) {
      console.log("GET TASK ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // 🔹 Create Task
  const createTask = async (req, res) => {
    try {
      const newTask = new Task({
        text: req.body.text,
        user: req.user.userId,
      });

      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      console.log("CREATE TASK ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // 🔹 Toggle Task
  const toggleTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user.userId,
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.completed = !task.completed;
      await task.save();

      res.status(200).json(task);
    } catch (error) {
      console.log("TOGGLE TASK ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // 🔹 Delete Task
  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId,
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.log("DELETE TASK ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
  };