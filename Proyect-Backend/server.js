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

app.post("/signup", function (req, res) {
  const newName = req.body.name;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newNationality = req.body.nationality;
  const newGender = req.body.gender;
  const newLanguage = req.body.language;
  const newLevel = req.body.level;
  const newBirthday = req.body.birthday;
  const newBio = req.body.bio;

  const query =
    "INSERT INTO user_info (username, password, full_name, date_of_birth, gender, nationality, description, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

  //   pool
  //     .query(query, [
  //       newUsername,
  //       newPassword,
  //       newName,
  //       newBirthday,
  //       newGender,
  //       newNationality,
  //       newBio,
  //       newEmail,
  //     ])
  //     .then(() => res.send("Profile created!"))
  //     .catch((e) => console.error(e));
  // });

  pool
    .query(query, [
      newUsername,
      newPassword,
      newName,
      newBirthday,
      newGender,
      newNationality,
      newBio,
      newEmail,
    ])
    .then(() => res.send("Profile created!"))
    .catch((e) => console.error(e));
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
