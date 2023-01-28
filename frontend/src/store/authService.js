import axios from "axios";

const URL = "/api/users/";

const register = async (userData) => {
  const { data } = await axios.post(URL, userData);

  if (data) localStorage.setItem("user", JSON.stringify(data));

  return data;
};

const authService = {
  register,
};
export default authService;
