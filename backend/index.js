const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("pickUP Backend is working fine");
});

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
