// const express = require("express");
// const pool = require("../db");
// const multer = require("multer");
// const path = require("path");

// const router = express.Router();

// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error("Invalid image type");
//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, path.join(__dirname, "../public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     const filename = file.originalname.replace(/\s/g, "-");
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${filename}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

// router.post("/upload", uploadOptions.single("image"), (req, res) => {
//   if (req.file) {
//     res.json({ url: `/public/uploads/${req.file.filename}` });
//   } else {
//     res.status(400).json({ message: "No image uploaded" });
//   }
// });

// router.get("/houses", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM houses");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/houses/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
//     if (result.rows.length > 0) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ message: "House not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/houses", uploadOptions.single("image"), async (req, res) => {
//   const { provider_name, email, city, cost, address, latitude, longitude } =
//     req.body;
//   const image = req.file ? `/public/uploads/${req.file.filename}` : null;
//   try {
//     await pool.query(
//       "INSERT INTO houses (provider_name, email, city, cost, address, latitude, longitude, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
//       [provider_name, email, city, cost, address, latitude, longitude, image]
//     );
//     res.status(201).json({ message: "House added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.put("/houses/:id", async (req, res) => {
//   const { id } = req.params;
//   const {
//     provider_name,
//     email,
//     city,
//     cost,
//     address,
//     latitude,
//     longitude,
//     image,
//   } = req.body;
//   try {
//     const result = await pool.query(
//       "UPDATE houses SET provider_name = $1, email = $2, city = $3, cost = $4, address = $5, latitude = $6, longitude = $7, image = $8 WHERE id = $9",
//       [
//         provider_name,
//         email,
//         city,
//         cost,
//         address,
//         latitude,
//         longitude,
//         image,
//         id,
//       ]
//     );
//     res.json({ message: "House updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.delete("/houses/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("DELETE FROM houses WHERE id = $1", [id]);
//     res.json({ message: "House deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/housescost", async (req, res) => {
//   const { cost } = req.query;
//   try {
//     const result = await pool.query("SELECT * FROM houses WHERE cost <= $1", [
//       cost,
//     ]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.get("/housescity", async (req, res) => {
//   const { city } = req.query;
//   try {
//     const result = await pool.query("SELECT * FROM houses WHERE city = $1", [
//       city,
//     ]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const pool = require("../db");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.replace(/\s/g, "-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.post("/upload", uploadOptions.single("image"), (req, res) => {
  if (req.file) {
    res.json({ url: `/public/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ message: "No image uploaded" });
  }
});

router.get("/houses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM houses");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/houses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "House not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/houses", uploadOptions.single("image"), async (req, res) => {
//   const { provider_name, email, city, cost, address, latitude, longitude } =
//     req.body;
//   const image = req.file ? `/public/uploads/${req.file.filename}` : null;
//   try {
//     const result = await pool.query(
//       "INSERT INTO houses (provider_name, email, city, cost, address, latitude, longitude, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
//       [provider_name, email, city, cost, address, latitude, longitude, image]
//     );
//     const house_id = result.rows[0].id;
//     res.status(201).json({ message: "House added successfully", house_id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.post("/houses", uploadOptions.single("image"), async (req, res) => {
  const { provider_name, email, city, cost, address, latitude, longitude } = req.body;
  const image = req.file ? `/public/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      "INSERT INTO houses (provider_name, email, city, cost, address, latitude, longitude, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [provider_name, email, city, cost, address, latitude, longitude, image]
    );
    
    const house_id = result.rows[0].id;
    res.status(201).json({ message: "House added successfully", house_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/houses/:id", async (req, res) => {
  const { id } = req.params;
  const {
    provider_name,
    email,
    city,
    cost,
    address,
    latitude,
    longitude,
    image,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE houses SET provider_name = $1, email = $2, city = $3, cost = $4, address = $5, latitude = $6, longitude = $7, image = $8 WHERE id = $9",
      [
        provider_name,
        email,
        city,
        cost,
        address,
        latitude,
        longitude,
        image,
        id,
      ]
    );
    res.json({ message: "House updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/houses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM houses WHERE id = $1", [id]);
    res.json({ message: "House deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/housescost", async (req, res) => {
  const { cost } = req.query;
  try {
    const result = await pool.query("SELECT * FROM houses WHERE cost <= $1", [
      cost,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/housescity", async (req, res) => {
  const { city } = req.query;
  try {
    const result = await pool.query("SELECT * FROM houses WHERE city = $1", [
      city,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

