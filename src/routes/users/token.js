import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";

const router = express.Router();

router.post("/token", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return res.json({
    message: "token is valid",
    user: { ...req.user, token: token },
  });
});

export default router;
