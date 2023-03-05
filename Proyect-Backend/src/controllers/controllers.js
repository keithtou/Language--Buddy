const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// Sentences SQL
const _getAll = "SELECT * FROM user_info";
const _getById = "SELECT * FROM user_info where id = $1";
const insertUser =
  "INSERT INTO user_info (username, email, password, full_name, date_of_birth, gender, nationality, language, language_level, description) VALUES ($1 ,$2 ,$3 , $4, $5, $6, $7, $8, $9, $10) RETURNING *";

const getAll = async (req, res) => {
  try {
    await pool.query("SELECT * FROM user_info", (error, result) => {
      res.json(result.rows);
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "SELECT * FROM user_info WHERE id = $1",
      [id],
      (error, result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "User not exits!!" });
        }
        res.json(result.rows[0]);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    full_name,
    date_of_birth,
    gender,
    nationality,
    language,
    language_level,
    description,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(insertUser, [
      username,
      email,
      bcryptPassword,
      full_name,
      date_of_birth,
      gender,
      nationality,
      language,
      language_level,
      description,
    ]);


    //I changed a little because the field with newuser.id was empty and I could not get id
    // const current_id = newUser.rows[0].id;
    const jwtToken = jwtGenerator(newUser.rows[0].id);
    return res.json({ jwtToken});
  } catch (error) {
    console.error(error.message);
    res.status(400).json(`this ${username} already exist!`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM user_info WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Invalid Credential", isAuthenticated: false });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Invalid Credential", isAuthenticated: false });
    }
    const jwtToken = jwtGenerator(user.rows[0].id);

    return res.status(200).json({ jwtToken, isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const sign_in = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  const logIn = "SELECT * FROM user_info WHERE email = $1 and password = $2";
  pool.query(logIn, [email, password], (error, result) => {
    console.log(error);
    console.log(result);
    if (result.rows.length === 0) {
      return res.status(400).send("User doesn't exist");
    } else if (
      (result.rows[0].email === email) &
      (result.rows[0].password === password)
    ) {
      return res.status(200).send("Success");
    }
  });
};

module.exports = {
  getAll,
  getById,
  createUser,
  login,
};
