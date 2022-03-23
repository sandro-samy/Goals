export const registerUser = (req, res) => {
  res.status(200).json({ message: "Register User" });
};
export const loginUser = (req, res) => {
  res.status(200).json({ message: "Login User" });
};
export const getMe = (req, res) => {
  res.status(200).json({ message: "Display User Data" });
};
