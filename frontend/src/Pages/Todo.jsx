import { useState, useEffect } from "react";
import api from "../api";   // ✅ axios config
import "./Todo.css";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔹 Fetch Tasks From Backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Add Task
  const addTask = async () => {
    if (taskInput.trim() === "") return;

    try {
      await api.post("/tasks", { text: taskInput });
      setTaskInput("");
      fetchTasks();
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  // 🔹 Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // 🔹 Toggle Task
  const toggleTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Toggle Error:", error);
    }
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-card">

        <h2 className="todo-title">Manage Your Tasks</h2>
        <p className="todo-subtitle">
          Stay productive and organized with SmartStudy
        </p>

        <div className="todo-input-group">
          <input
            type="text"
            className="todo-input"
            placeholder="Enter a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="todo-btn" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="todo-list">
          {tasks.length === 0 && (
            <p className="empty-text">No tasks yet</p>
          )}

          {tasks.map((task) => (
            <div
              key={task._id}   // ✅ MongoDB id
              className={`todo-item ${
                task.completed ? "completed" : ""
              }`}
            >
              <span
                className="todo-text"
                onClick={() => toggleTask(task._id)}
              >
                {task.text}
              </span>

              <div className="todo-actions">
                <button
                  className="complete-btn"
                  onClick={() => toggleTask(task._id)}
                >
                  {task.completed ? "Completed" : "Mark Done"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Todo;