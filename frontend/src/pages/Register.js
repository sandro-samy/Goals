import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, register } from "../store/authSlice";
import Spinner from "../components/loader/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });
  const { name, email, password, comfirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user.email) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigator, dispatch]);

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

    if (password !== comfirmPassword) {
      toast.error("password does not match!");
      return;
    }

    dispatch(register({ name, email, password }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section>
      <h1>
        <FaUser /> Register
      </h1>
      <p className="mb-5">Create new account</p>
      <form onSubmit={submitHandler} className="form-container">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="please enter your name"
            onChange={changeHandler}
          />
        </div>
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
          <input
            type="password"
            className="form-control"
            id="comfirmPassword"
            name="comfirmPassword"
            value={comfirmPassword}
            placeholder="Please comfirm Password"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
        <p>
          Already have account? <Link to={"/login"}>login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
