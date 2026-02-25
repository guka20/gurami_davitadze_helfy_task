const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middleware/middleware");

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
    const { title, completed = false } = req.body;
    const task = {
      id: nextId++,
      title: title,
      completed,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);
    res.status(201).json({ data: task });
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
