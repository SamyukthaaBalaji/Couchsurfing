const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "Samyukthaa_12345",
  host: "localhost",
  port: 5432,
  database: "couch_surfing",
});
module.exports = pool;
