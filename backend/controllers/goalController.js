import asyncHandler from "express-async-handler"
// @desc   Get goals
// @route  Get /api/goals
// @access Private
export const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Goals" });
});

// @desc   Post goal
// @route  Post  /api/goals
// @access Private
export const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body)
  if (!req.body.text) {
    res.status(400)
    throw new Error("please add text field")
  }
  res.status(200).json({ message: req.body.text });
});

// @desc   Put goal
// @route  Put /api/goals/:id
// @access private
export const updateGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Update Goal ${id}` });
});

// @desc   Delete goal
// @route  Delete /api/goals/:id
// @access private
export const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `delete Goal ${id}` });
});
