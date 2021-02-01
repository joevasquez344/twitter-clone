const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require('express-session');

app.use(express.json());

const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");

dotenv.config();

// app.use(session({
//   secret: process.env.JWT_SECRET,
//   resave: true,
//   saveUninitialized: false
// }))

connectDB();

app.get("/", (req, res) => {
  res.send("Test Route");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`.yellow.bold)
);
