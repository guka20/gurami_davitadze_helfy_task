const { validateCreateTask } = require("../middleware/middleware");

let tasks = [];
let nextId = 1;

const findTask = (id) => tasks.find((t) => t.id === parseInt(id));

const registerRoutes = (app) => {
  app.get("/api/tasks", (req, res) => {
    res.status(200).json({
      data: tasks,
    });
  });

  app.post("/api/tasks", validateCreateTask, (req, res) => {
    const { title, completed = false, priority, description } = req.body;
    const task = {
      id: nextId++,
      title: title,
      completed,
      priority: priority,
      description: description,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);
    res.status(201).json({ data: task });
  });
  app.put("/api/tasks/:id", (req, res) => {
    const task = findTask(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: `Task with id ${req.params.id} not found`,
      });
    }

    const { title, description, priority } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  });
  app.delete("/api/tasks/:id", (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({
        message: `Task with id ${req.params.id} not found`,
      });
    }

    const [deleted] = tasks.splice(index, 1);
    res.status(200).json({ data: deleted });
  });

  app.patch("/api/tasks/:id/toggle", (req, res) => {
    const task = findTask(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: `Task with id ${req.params.id} not found`,
      });
    }

    task.completed = !task.completed;

    res.status(200).json({ data: task });
  });
};

module.exports = registerRoutes;
