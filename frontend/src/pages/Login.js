import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <section>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p className="mb-5" >Login and Create your Goals</p>
      <form onSubmit={submitHandler} className="form-container">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Please enter your email"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Please enter your password"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn mb-5">
            Submit
          </button>
        </div>
        <p>
          Don't have account? <Link to={"/register"}>register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
