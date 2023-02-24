const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "languagebuddy",
  password: "postgres",
  port: 5432,
});
app.get("/", (req, res) => {
  pool.query("select * from user_info", (error, result) => {
    res.json(result.rows);
  });
});
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
