const jwt = require("jsonwebtoken");
require("dotenv").config(); // This line ensures that the environment variables are loaded

function jwtGenerator(id) {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
