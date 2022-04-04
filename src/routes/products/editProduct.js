import express from "express";
import Product from "../../models/product.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.patch(
  "/(:id)",
  [
    body("title")
      .isLength({ min: 4, max: 40 })
      .withMessage("Title  must be between 4 and 50 characters"),
    body("description")
      .isLength({ min: 20, max: 500 })
      .withMessage("Description must be between 4 and 1000 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    const dataToChange = {
      title: req.body.title,
      description: req.body.description,
    };

    Product.findByIdAndUpdate(req.params.id, dataToChange, (err, doc) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "failed to change object with that id" });
      } else {
        return res.json({ message: "Product successfully edited", data: doc });
      }
    });
  }
);

export default router;
