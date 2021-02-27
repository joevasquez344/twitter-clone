const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require('express-session');
const path = require('path');

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


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const dirname = path.resolve();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html')))
} else {
  app.get("/", (req, res) => {
    res.send("Test Route");
  });
  
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`.yellow.bold)
);
