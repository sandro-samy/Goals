import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter your name"],
    },
    email: {
      type: String,
      require: [true, "please enter your email"],
      unique:[true,"Already Exist!"]
    },
    password: {
      type: String,
      require: [true, "please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User",userSchema)
