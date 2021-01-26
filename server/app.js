require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes import
app.use("/api/", require("./routes"))

// Serve frontend as static assets if in production
if (process.env.NODE_ENV === "production") {
  // Serve frontend files
  app.use(express.static("../client/build"));
  // Getting all the routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../client/build/index.html"));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`Server is running at ${port}`);
});
