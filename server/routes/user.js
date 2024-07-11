const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const transporter = require("../emailConfig");
const jwtGenerator = require("../utils/jwtgenerator");

// Helper function to validate user_type
const validateUserType = (userType) => {
  return ["host", "guest"].includes(userType);
};

router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body); // This should log the entire request body

  const { username, email, password, phone_number, country, city, user_type } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !phone_number ||
    !country ||
    !city ||
    !user_type
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validateUserType(user_type)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  try {
    // Check if the email already exists
    const emailExistsQuery = "SELECT * FROM usersinfo WHERE email = $1";
    const emailExistsValues = [email];
    const emailExistsResult = await pool.query(
      emailExistsQuery,
      emailExistsValues
    );

    if (emailExistsResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO usersinfo (username, email, password, phone_number, country, city, user_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      username,
      email,
      hashedPassword,
      phone_number,
      country,
      city,
      user_type,
    ];

    const { rows } = await pool.query(query, values);
    const newUser = rows[0];
    const token = jwtGenerator(newUser.user_id);

    // Send a confirmation email
    const mailOptions = {
      from: "samyukthaa2003@gamil.com",
      to: newUser.email,
      subject: "Welcome to NomadNights!",
      text: `Hello ${newUser.username},\n\nThank you for registering on NomadNights as a ${newUser.user_type}. We are excited to have you on board.\n\nBest regards,\nNomadNights Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Request Body:", req.body); // This should log the entire request body

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = "SELECT * FROM usersinfo WHERE email = $1";
    const values = [email];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwtGenerator(user.user_id);
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
