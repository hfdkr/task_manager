const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//  Serve frontend
app.use(express.static("public"));

// API routes
app.use("/tasks", taskRoutes);

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});