const express = require("express");
const app = express();
const colors = require("colors");

app.get("/", (req, res) => {
  res.send("Test Route");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`.yellow.bold)
);
