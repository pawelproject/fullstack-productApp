import express from "express";
import Product from "../../models/product.js";
import { body, validationResult } from "express-validator";
import { authRole } from "../../middleware/authRole.js";

const router = express.Router();

router.post(
  "/create",
  authRole(["admin"]),
  [
    body("title")
      .isLength({ min: 4, max: 40 })
      .withMessage("Title  must be between 4 and 50 characters"),
    body("description")
      .isLength({ min: 20, max: 500 })
      .withMessage("Description must be between 4 and 1000 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }
    const product = new Product(req.body);

    product.save().then((result) => {
      return res.status(200).json({ product: result });
    });
  }
);

export default router;
