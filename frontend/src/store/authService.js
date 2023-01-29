import axios from "axios";

// const URL = "/api/users/";
const URL = "https://goals.up.railway.app/api/users/";

// register service
const register = async (userData) => {
  const { data } = await axios.post(URL, userData);
  if (data) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

// login service
const login = async (userData) => {
  const { data } = await axios.post(URL + "login", userData);
  if (data) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

// logout service
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};
export default authService;
