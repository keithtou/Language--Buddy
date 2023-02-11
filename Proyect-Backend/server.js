const express = require("express");
const app = express();
xs;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server is up and running"));
