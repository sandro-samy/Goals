import { response } from "express";
import asyncHandler from "express-async-handler";
import Goal from "../model/goalModel.js";
// @desc   Get goals
// @route  Get /api/goals
// @access Private
export const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc   Post goal
// @route  Post  /api/goals
// @access Private
export const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(201).json(goal);
});

// @desc   Put goal
// @route  Put /api/goals/:id
// @access private
export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.statusCode(400)
    throw new Error("goal not found")
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new:true
  })
  res.status(200).json(updatedGoal);
});

// @desc   Delete goal
// @route  Delete /api/goals/:id
// @access private
export const deleteGoal = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    response.status(400)
    throw new Error("goal not found");
  }
  await Goal.findByIdAndRemove(req.params.id)
  res.status(200).json({ message: `Goal ${req.params.id} deleted successfully` });
});
