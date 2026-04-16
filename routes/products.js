const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductDetails,
  createProduct
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getProductDetails);

router.post("/admin/create", createProduct);

module.exports = router;