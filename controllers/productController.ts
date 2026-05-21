const db = require("../config/db");

exports.getProducts = async (req, res) => {

  try {

    const [products] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });

  }

};


exports.getProductDetails = async (req, res) => {

  try {

    const productId = req.params.id;

    const [product] = await db.query(
      "SELECT * FROM products WHERE id=?",
      [productId]
    );

    const [variants] = await db.query(
      "SELECT * FROM product_variants WHERE product_id=?",
      [productId]
    );

    res.json({
      product: product[0],
      variants: variants
    });

  } catch (error) {

    res.status(500).json({
      message: "Error loading product",
      error: error.message
    });

  }

};


exports.createProduct = async (req, res) => {

  try {

    const { name, description, price, image, variants } = req.body;

    const [result] = await db.query(
      `INSERT INTO products (name, description, base_price, image)
       VALUES (?, ?, ?, ?)`,
      [name, description, price, image]
    );

    const productId = result.insertId;

    for (const variant of variants) {

      await db.query(
        `INSERT INTO product_variants
        (product_id, color, size, price, stock)
        VALUES (?, ?, ?, ?, ?)`,
        [
          productId,
          variant.color,
          variant.size,
          variant.price,
          variant.stock
        ]
      );

    }

    res.json({
      success: true,
      message: "Product created successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Product creation failed",
      error: error.message
    });

  }

};