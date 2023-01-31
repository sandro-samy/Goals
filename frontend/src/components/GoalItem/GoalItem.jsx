import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../../store/goalsSlice";

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    dispatch(deleteGoal(id));
  };
  return (
    <div className="goal">
      <div>{goal?.createdAt?.substring(0,10)}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => deleteHandler(goal._id)}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
