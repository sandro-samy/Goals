import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

// @desc   create new user
// @route  POST /api/user
// @access public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if there is missing data
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all field");
  }

  // check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);
  const hashPassword = bcrypt.hashSync(password);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  // check unexpected errors
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   user login
// @route  POST /api/user/login
// @access public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });


  if (user &&  await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc   get profile
// @route  GET /api/user/me
// @access private
export const getMe = (req, res) => {
  res.status(200).json({ ...req.user });
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
