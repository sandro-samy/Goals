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
  const { data } = await axios.get(url, header());
  console.log(data);
  return data;
};

// postGoal
const postGoal = async (text) => {
  const { data } = await axios.post(url, { text }, header());
  return getGoals;
};

// update Goal Service
const updateGoal = async (id, text) => {
  const { data } = await axios.update(url + "/" + id, { text }, header());
  return getGoals;
};

// delete Goal Service
const deleteGoal = async (id) => {
  const { data } = await axios.delete(url + "/" + id, header());
  return getGoals;
};

const goalsService = {
  getGoals,
  postGoal,
  deleteGoal,
  updateGoal,
};
export default goalsService;
