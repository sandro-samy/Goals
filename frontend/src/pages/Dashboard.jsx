import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalForm from "../components/GoalForm/GoalForm";
import GoalItem from "../components/GoalItem/GoalItem";
import Spinner from "../components/loader/Spinner";
import { getGoals, reset } from "../store/goalsSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.goals
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user ? user.name : ""}</h1>
        <p>Goals DashBoard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not any goals yet</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
