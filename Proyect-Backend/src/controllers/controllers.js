const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// Sentences SQL
const _getAll = "SELECT * FROM user_info";
const _getById = "SELECT * FROM user_info where id = $1";
const insertUser =
  "INSERT INTO user_info (username, email, password, full_name, date_of_birth, gender, nationality, language, language_level, description) VALUES ($1 ,$2 ,$3 , $4, $5, $6, $7, $8, $9, $10) RETURNING *";
const insertConnection =
  "INSERT INTO connection (requester_id, responder_id, status) VALUES ($1, $2, $3) RETURNING *";
const updateConnectionStatus =
  "UPDATE connection SET status = $1 WHERE id=$2 RETURNING *";

const getAll = async (req, res) => {
  const actor_id = req.user.id;

  try {
    await pool.query(
      "SELECT user_info.*, \
                            language_level.levels, \
                            languages.language_name \
                      FROM user_info \
                      JOIN languages ON user_info.language = languages.id \
                      JOIN language_level ON language_level.id = user_info.language_level \
                      WHERE user_info.id NOT IN ( \
                          SELECT user_info.id FROM user_info \
                            JOIN connection ON (user_info.id = connection.requester_id OR user_info.id = connection.responder_id) \
                            WHERE connection.requester_id=$1 OR \
                                  connection.responder_id=$1)",
      [actor_id],
      (error, result) => {
        res.json(result.rows);
      }
    );
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await pool.query(
      "SELECT user_info.*, \
              language_level.levels, \
              languages.language_name \
      FROM user_info \
      JOIN languages ON user_info.language=languages.id  \
      JOIN language_level ON language_level.id=user_info.language_level \
      WHERE user_info.id=$1",
      [id],
      (error, result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({
            message: "User not exits!!",
          });
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
    return res.json({
      jwtToken,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await pool.query("SELECT * FROM user_info WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid Credential",
        isAuthenticated: false,
      });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid Credential",
        isAuthenticated: false,
      });
    }
    const jwtToken = jwtGenerator(user.rows[0].id);
    return res.status(200).json({
      jwtToken: jwtToken,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const edit = async (req, res) => {
  const id = req.params.id;

  const newUsername = req.body.username;
  const newName = req.body.full_name;
  const newBirth = req.body.date_of_birth;
  const newGender = req.body.gender;
  const newNationality = req.body.nationality;
  const newLanguage = req.body.language;
  const newLevel = req.body.language_level;
  const newDescription = req.body.description;

  try {
    let update_user = await pool.query(
      "UPDATE user_info SET username=$1, full_name=$2, gender=$3, nationality=$4, language=$5, language_level=$6, description=$7, date_of_birth=$8 WHERE id=$9 RETURNING *",
      [
        newUsername,
        newName,
        newGender,
        newNationality,
        newLanguage,
        newLevel,
        newDescription,
        newBirth,
        id,
      ]
    );

    return res.status(200).json({
      user: update_user.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
};

const delete_user = async (req, res) => {
  const {
    id
  } = req.params;
  const actor_id = req.user.id;
  const client = await pool.connect();

  try {
    if (actor_id != id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
  
    await client.query('BEGIN')
    const deleteConnectionsText = 'DELETE FROM connection WHERE responder_id=$1 OR requester_id=$1'
    const resConnectionDelete = await client.query(deleteConnectionsText, [id])

    const deleteUserText = 'DELETE FROM user_info WHERE id=$1'
    const resUserDelete = await client.query(deleteUserText, [id])
    await client.query('COMMIT')
      .then(() => res.send(`User ${id} deleted!`));
  } catch (error) {
    console.log(error);
    await client.query('ROLLBACK')
    return res.status(400).json({
      message: "Could not delete",
    });
  } finally {
    client.release()
  };

}

const auth = async (req, res) => {
  try {
    res.status(200).send({
      isAuthenticated: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      isAuthenticated: false,
    });
  }
};

//  language, language_level   language_level.levels, \ languages.language_name \

const connections = async (req, res) => {
  const id = req.user.id;
  try {
    await pool.query(
      "SELECT connection.*, \
                             requester.email    AS requester_email, \
                             requester.username AS requester_username, \
                             requester.nationality    AS requester_nationality, \
                             requester.description AS requester_description, \
                             requester_languages.language_name AS requester_language, \
                             requester_language_level.levels AS requester_level, \
                             responder.email    AS responder_email, \
                             responder.username AS responder_username, \
                             responder.nationality    AS responder_nationality, \
                             responder.description AS responder_description, \
                             responder_languages.language_name AS responder_language, \
                             responder_language_level.levels AS responder_level \
                      FROM   connection \
                        JOIN user_info requester \
                          ON requester.id = connection.requester_id \
                        JOIN user_info responder \
                          ON responder.id = connection.responder_id \
                        JOIN languages  requester_languages \
                          ON requester.language = requester_languages.id \
                        JOIN languages responder_languages \
                          ON responder.language = responder_languages.id \
                        JOIN language_level requester_language_level \
                          ON requester.language_level = requester_language_level.id \
                        JOIN language_level responder_language_level \
                          ON responder.language_level = responder_language_level.id \
                      WHERE  connection.requester_id = $1 \
                        OR connection.responder_id = $2",
      [id, id],
      (error, result) => {
        if (result.rows.length === 0) {
          return res.status(200).json([]);
        }
        res.json(result.rows);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const createConnection = async (req, res) => {
  const {
    responder_id
  } = req.body;
  const actor_id = req.user.id;

  try {
    if (responder_id == actor_id) {
      return res.status(400).json({
        message: "Cannot make connection to yourself.",
      });
    }

    let connection = await pool.query(
      "SELECT * FROM connection WHERE responder_id=$1 AND requester_id=$2",
      [actor_id, responder_id]
    );

    if (connection.rows.length > 0) {
      return res.status(400).json({
        message: `Cannot create connection ${actor_id} - ${responder_id}. Reverse connection already exists.`,
      });
    }

    let newConnection = await pool.query(insertConnection, [
      actor_id,
      responder_id,
      "pending",
    ]);

    return res.json(newConnection.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: `Cannot create connection between ${responder_id} and ${actor_id}`,
    });
  }
};

const updateConnection = async (req, res) => {
  const connection_id = req.params.id;
  const {
    status
  } = req.body;
  const actor_id = req.user.id;

  if (status !== "approved" && status !== "rejected") {
    return res.status(400).json({
      message: `Bad status ${status}. Supported: [approved, rejected].`,
    });
  }

  try {
    let connection = await pool.query(
      "SELECT * FROM connection WHERE id=$1 AND responder_id=$2 AND status='pending'",
      [connection_id, actor_id]
    );

    if (connection.rows.length === 0) {
      return res.status(400).json({
        message: `Cannot update connection ${connection_id}. Either status is not pending or you are not responder.`,
      });
    }

    console.log(connection.rows[0]);

    let updatedConnection = await pool.query(updateConnectionStatus, [
      status,
      connection_id,
    ]);

    return res.json(updatedConnection.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: `Cannot create connection between ${responder_id} and ${actor_id}`,
    });
  }
};

const deleteConnection = async (req, res) => {
  const connection_id = req.params.id;
  const actor_id = req.user.id;

  try {
    let connection = await pool.query(
      "SELECT * FROM connection WHERE id=$1 AND requester_id=$2 OR (responder_id=$3 AND (status='approved' OR status='rejected'))",
      [connection_id, actor_id, actor_id]
    );

    if (connection.rows.length === 0) {
      return res.status(400).json({
        message: `Cannot delete connection ${connection_id}`,
      });
    }

    await pool
      .query("DELETE FROM connection WHERE id=$1", [connection_id])
      .then(() =>
        res.json({
          message: `Connection ${connection_id} deleted.`
        })
      );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: `Cannot delete connection ${connection_id}`,
    });
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  login,
  edit,
  delete_user,
  auth,
  connections,
  createConnection,
  updateConnection,
  deleteConnection,
};
