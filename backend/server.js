import express from "express";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(errorHandler)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
