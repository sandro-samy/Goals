import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/goalsSlice";
import { getGoals, postGoal } from "../../store/goalsSlice";

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  

  const submitHandler = (e) => {
    console.log("ho");
    e.preventDefault();
    dispatch(postGoal(text));
    setText("");
  };
  
  return (
    <section>
      <form
        onSubmit={submitHandler}
        disabled={text.length === 0}
        className="form addGoalContainer"
      >
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn" disabled={text.length === 0} type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
