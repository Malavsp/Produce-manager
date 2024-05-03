// Imports
const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routers/admin");

// Create and configure
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

// Root router
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Homepage</h1>");
});

app.get("/error", (req, res) => {
  throw new Error("Something has gone terribly wrong....");
});

app.use("/admin", adminRouter);

// Error Handling
// Unknown Request handler
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Something is wrong try again later ",
    reqBody: req.body,
    reqPath: req.path,
    reqQuery: req.query,
    reqMethod: req.method,
    statusCode: res.statusCode,
  });
});

// Internal Error handler
const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(" Internal Malfunction  ");
};

app.use(handleError);

module.exports = app;
