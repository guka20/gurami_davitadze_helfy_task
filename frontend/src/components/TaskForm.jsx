import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialData = null }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });


  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    } else {
      setTask({ title: "", description: "", priority: "low" });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return alert("Title is required");

    onSubmit(task);

    if (!initialData) {
      setTask({ title: "", description: "", priority: "low" });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Update Task" : "Add New Task"}</h3>

      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Task Title"
      />

      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
      />

      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button type="submit">{initialData ? "Update Task" : "Add Task"}</button>

      {initialData && (
        <button
          type="button"
          onClick={() =>
            setTask({ title: "", description: "", priority: "low" })
          }
        >
          Clear/Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
