import express from "express";

import signupRouter from "./signup.js";
import signinRouter from "./signin.js";
import tokenRouter from "./token.js";

const router = express.Router();

router.use(signupRouter);
router.use(signinRouter);
router.use(tokenRouter);

export default router;
