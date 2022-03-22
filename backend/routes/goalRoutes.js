import express from "express";
import {
  deleteGoal,
  getGoal,
  setGoal,
  updateGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.route("/").get(getGoal).post(setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

export default router;
