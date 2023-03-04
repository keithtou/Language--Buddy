const { Pool } = require("pg");

const pool = new Pool({
    user: 'occ-0063',
    password: '',
    host: 'localhost',
    database: 'language_buddy',
    port: 5432
});

module.exports = pool;
