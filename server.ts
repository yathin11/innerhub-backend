import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import connectDB from "./config/db";

import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import cartRoutes from "./routes/cart";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import paymentRoutes from "./routes/payment";
import delhiveryRoutes from "./routes/delhivery";


const app = express();

// MongoDB Atlas Connection
connectDB();
import Product from "./models/Product";

setTimeout(async () => {
  try {
    const data = await Product.find();
    console.log("PRODUCT TEST:", data.length);
  } catch (err) {
    console.error("PRODUCT TEST ERROR:", err);
  }
}, 3000);
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://innerhub-ecommerce.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/delhivery", delhiveryRoutes);

// Health Check
app.get("/", (_req: Request, res: Response) => {
  res.send("🔥 Ecommerce Backend Running");
});

// Server Start
const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});