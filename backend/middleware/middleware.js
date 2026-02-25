const cors = require("cors");
const express = require("express");

const applyMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
};

const validateTask = (body, requireAll = true) => {
  const errors = [];
  const { title, completed, priority } = body;

  if (requireAll && (title === undefined || title === null)) {
    errors.push("title is required");
  }
  if (priority !== "low" && priority !== "medium" && priority !== "high") {
    errors.push("priority should be low, medium or high");
  }
  if (title !== undefined && typeof title !== "string") {
    errors.push("title must be a string");
  }
  if (
    title !== undefined &&
    typeof title === "string" &&
    title.trim().length === 0
  ) {
    errors.push("title cannot be empty");
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    errors.push("completed must be a boolean");
  }

  return errors;
};

const validateCreateTask = (req, res, next) => {
  const errors = validateTask(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const validateUpdateTask = (req, res, next) => {
  const errors = validateTask(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Route ${req.method} not found`,
  });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).json({ message: "Internal server error" });
};

module.exports = {
  applyMiddleware,
  validateCreateTask,
  validateUpdateTask,
  notFoundHandler,
  errorHandler,
};
