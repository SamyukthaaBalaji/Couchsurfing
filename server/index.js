// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 9000;

// app.use(express.json());
// app.use(cors());
// app.use("/user", require("./routes/user"));
// app.use("/house", require("./routes/houses"));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.use("/user", require("./routes/user"));
app.use("/house", require("./routes/houses"));
app.use("/book",require("./routes/bookings"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
