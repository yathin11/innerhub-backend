const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const paymentRoutes = require("./routes/payment");
const delhiveryRoutes = require("./routes/delhivery");

const app = express();

// 🔹 Connect DB
connectDB();

// 🔹 CORS (🔥 IMPORTANT FIX)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app" // 👈 REPLACE THIS
  ],
  credentials: true
}));

// 🔹 Middleware
app.use(express.json());

// 🔹 Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/delhivery", delhiveryRoutes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("🔥 Ecommerce Backend Running");
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});