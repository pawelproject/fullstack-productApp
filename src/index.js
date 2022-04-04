import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mainRouter from "./routes/index.js";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.use(express.json());
app.use(cors());

app.use(express.static("client/build"));

app.use(mainRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
