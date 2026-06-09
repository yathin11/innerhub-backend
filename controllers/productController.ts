import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find().sort({ _id: -1 });

    res.json(products);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error: any) {
  console.error("PRODUCT ERROR:", error);

  res.status(500).json({
    message: "Error fetching products",
    error: String(error),
  });
}
};