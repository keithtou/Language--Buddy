const { Pool } = require("pg");
require("dotenv").config({ path: "./vars/.env" });
const dUser = process.env.DATABASE_USER;
const dPassword = process.env.DATABASE_PASSWORD;
const dHost = process.env.DATABASE_HOST;
const dName = process.env.DATABASE_NAME;
const dPort = process.env.DATABASE_PORT;

const pool = new Pool({
  user: dUser,
  password: dPassword,
  host: dHost,
  database: dName,
  port: dPort,
  ssl: {
    rejectUnauthorized: false
  }
});
console.log(pool);

module.exports = pool;
