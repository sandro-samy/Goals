import axios from "axios";

// const url = "/api/goals";
const url = "https://goals.up.railway.app/api/goals";

const accessToken = () => JSON.parse(localStorage.getItem("user"))?.token || "";

const header = () => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  };
};

// getGoals service
const getGoals = async () => {
  const { data } = await axios(url, header());
  return data;
};

// postGoal
const postGoal = async (text) => {
  const { data } = await axios.post(url, { text }, header());
  return data;
};

// update Goal Service
const updateGoal = async (id, text) => {
  const { data } = await axios.update(url + "/" + id, { text }, header());
  return data;
};

// delete Goal Service
const deleteGoal = async (id) => {
  const { data } = await axios.delete(url + "/" + id, header());
  return data;
};

const goalsService = {
  getGoals,
  postGoal,
  deleteGoal,
  updateGoal,
};
export default goalsService;
