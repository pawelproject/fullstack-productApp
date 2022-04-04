import express from "express";
import path from "path";

import usersRouter from "./users/index.js";
import productRouter from "./products/index.js";

// because es module
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use("/users", usersRouter);
router.use("/products", productRouter);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

export default router;
