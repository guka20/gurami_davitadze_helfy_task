import React, { useState, useEffect } from "react";
import "./styles/style.css";
import { taskService } from "./services/api";
import Carousel from "./components/Carousel";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newTask) => {
    try {
      await taskService.create({ ...newTask, completed: false });
      await loadTasks();
    } catch (err) {
      alert("Error creating task: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await taskService.delete(id);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      await taskService.update(taskData.id, taskData);

      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };
  const startEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleToggle = async (task) => {
    try {
      await taskService.toggleStatus(task.id, {
        ...task,
        completed: !task.completed,
      });
      await loadTasks();
    } catch (error) {
      alert("Error updating task: " + err.message);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    return true;
  });
  const handleSubmit = (taskData) => {
    if (editingTask) {
      handleUpdate(taskData);
    } else {
      handleAdd(taskData);
    }
  };
  return (
    <div className="container">
      <h1>Task Carousel</h1>

      <TaskForm onSubmit={handleSubmit} initialData={editingTask} />

      <div className="filters">
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          tasks={filteredTasks}
          renderItem={(task) => (
            <div
              className={`task-card ${task.priority} ${task.completed ? "completed" : ""}`}
            >
              <span className="priority-badge">{task.priority}</span>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="actions">
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => handleToggle(task)}>
                  {task.completed ? "Undo" : "✓"}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(task.id)}
                >
                  🗑
                </button>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default App;
