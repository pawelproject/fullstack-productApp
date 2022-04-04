import express from "express";
import Product from "../../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const params = {};

  if (req.query.id) {
    params._id = req.query.id;
  }

  try {
    const products = await Product.find(params).select("_id title description");

    res.json({ products: products });
  } catch (err) {
    res.status(404).json({ message: "failed to find product with that id" });
  }
});

export default router;
