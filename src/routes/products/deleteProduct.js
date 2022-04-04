import express from "express";
import { authRole } from "../../middleware/authRole.js";
import Product from "../../models/product.js";

const router = express.Router();

router.delete("/(:id)", authRole(["admin"]), (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      if (doc) {
        return res.json({ message: "Product successfully deleted" });
      } else {
        return res
          .status(404)
          .json({ message: "Product with that id didn't exist" });
      }
    } else {
      return res.status(500);
    }
  });
});

export default router;
