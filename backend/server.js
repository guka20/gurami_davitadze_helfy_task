const express = require("express");
const {
  applyMiddleware,
  notFoundHandler,
  errorHandler,
} = require("./middleware/middleware");
const registerRoutes = require("./routes/routes");

const app = express();
const PORT = 4000;

applyMiddleware(app);

registerRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API is running at localhost:${PORT}`);
});

module.exports = app;
