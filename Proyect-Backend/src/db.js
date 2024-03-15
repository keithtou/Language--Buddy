const { Pool } = require("pg");
require("dotenv").config({ path: "./vars/.env" });
require("dotenv").config();
const dUser = "postgres.mbnjboajqomxiwayhfgr";
const dPassword = process.env.DATABASE_PASSWORD;
const dHost = "aws-0-eu-west-2.pooler.supabase.com";
const dName = "postgres";
const dPort = 5432;


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
