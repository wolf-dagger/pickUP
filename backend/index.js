const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.4:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("pickUP Backend is working fine");
});

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("pickUP API is runing in development mode");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
