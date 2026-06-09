import express from "express";
import { createOrder } from "../controllers/paymentController";

const router = express.Router();

router.post("/create-order", createOrder);

export default router;