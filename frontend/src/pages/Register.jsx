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
  const [isValidInputs, setIsValidInputs] = useState(false);

  const { name, email, password, comfirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (
      name.length > 2 &&
      email.includes("@") &&
      email.includes(".") &&
      password.length > 5 &&
      comfirmPassword > 5
    ) {
      setIsValidInputs(true);
    }
  }, [name, email, password, comfirmPassword, setIsValidInputs]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || !!user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);

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
      <form
        onSubmit={submitHandler}
        className="form-container"
        disabled={!isValidInputs}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="please enter your name"
            onChange={changeHandler}
            minLength={2}
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
            minLength={6}
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
            minLength={6}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn" disabled={!isValidInputs}>
            Submit
          </button>
        </div>
        <p>
          Already have account?{" "}
          <Link to={"/login"} className="link">
            login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
