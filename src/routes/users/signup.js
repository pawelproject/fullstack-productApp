import express from "express";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 4, max: 40 })
      .withMessage("Password must be between 4 and 40 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    // checking if account with that email already exist
    const user = await User.findOne({ email: req.body.email }).select("email");

    if (user) {
      return res
        .status(400)
        .json({ message: "Account with that email already exist" });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        role: "basic",
      });

      user.save().then((result) => {
        res.json({ message: "Account successfully create" });
      });
    } catch (err) {
      res.status(500).send();
    }
  }
);

export default router;
