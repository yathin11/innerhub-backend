import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    console.log("Product Model:", Product);

    const products = await Product.find();

    res.json(products);
  } catch (error: any) {
    console.error("PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error fetching products",
      error: String(error),
      stack: error?.stack,
    });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching product",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;