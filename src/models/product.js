// const mongoose = require("mongoose");
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: "Title is required",
    required: true,
    // minlength: 4,
    // maxlength: 100,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
