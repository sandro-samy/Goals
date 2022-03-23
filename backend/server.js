import express from "express";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
