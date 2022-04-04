import express from "express";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

function generateAccessToken(user) {
  delete user.password;
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "300d" });
}

router.post(
  "/signin",
  [
    body("email").exists().withMessage("Email is required"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    const sendError = () => {
      return res.status(400).json({ message: "Invalid email or password" });
    };

    const userData = await User.find({ email: req.body.email }).select(
      "email password role"
    );

    const userObject = userData[0];

    if (!userObject) return sendError();

    const user = {
      email: userObject.email,
      password: userObject.password,
      role: userObject.role,
    };

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isCorrect) {
      const accessToken = generateAccessToken(user);
      res.json({
        accessToken: accessToken,
        email: user.email,
        role: user.role,
      });
    } else {
      return sendError();
    }
  }
);

export default router;
