import express from "express";
import getProducts from "./getProducts.js";
import createProduct from "./createProduct.js";

import deleteProduct from "./deleteProduct.js";
import editProduct from "./editProduct.js";
import { authenticateToken } from "../../middleware/authenticateToken.js";
const router = express.Router();

router.use(authenticateToken);
router.use(getProducts);
router.use(deleteProduct);
router.use(createProduct);
router.use(editProduct);

export default router;
