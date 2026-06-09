"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const products_1 = __importDefault(require("./routes/products"));
const orders_1 = __importDefault(require("./routes/orders"));
const cart_1 = __importDefault(require("./routes/cart"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const payment_1 = __importDefault(require("./routes/payment"));
const delhivery_1 = __importDefault(require("./routes/delhivery"));
const app = (0, express_1.default)();
// MongoDB Atlas Connection
(0, db_1.default)();
const Product_1 = __importDefault(require("./models/Product"));
setTimeout(async () => {
    try {
        const data = await Product_1.default.find();
        console.log("PRODUCT TEST:", data.length);
    }
    catch (err) {
        console.error("PRODUCT TEST ERROR:", err);
    }
}, 3000);
// Middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://innerhub-ecommerce.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Routes
app.use("/api/products", products_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/cart", cart_1.default);
app.use("/api/user", user_1.default);
app.use("/api/admin", admin_1.default);
app.use("/api/payment", payment_1.default);
app.use("/api/delhivery", delhivery_1.default);
// Health Check
app.get("/", (_req, res) => {
    res.send("🔥 Ecommerce Backend Running");
});
// Server Start
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
