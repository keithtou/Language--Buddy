const { Pool } = require("pg");
require("dotenv").config({ path: "./.env" });
const dUser = process.env.DATABASE_USER;
const dHost = process.env.DATABASE_HOST;
const dName = process.env.DATABASE_NAME;
const dPort = process.env.DATABASE_PORT;

const pool = new Pool({
  dUser,
  dHost,
  dName,
  dPort,
});
console.log(pool);

module.exports = pool;
