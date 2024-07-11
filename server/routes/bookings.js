const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/bookings", async (req, res) => {
  const { house_id, user_id, start_date, end_date } = req.body;

  if (!house_id || !user_id || !start_date || !end_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO bookings (house_id, user_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [house_id, user_id, start_date, end_date]
    );
    console.log(result);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error during booking:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
