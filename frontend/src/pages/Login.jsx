import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, login } from "../store/authSlice";
import Spinner from "../components/loader/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isValidInputs, setIsValidInputs] = useState(false);

  const { email, password } = formData;

  useEffect(() => {
    if (email.includes("@") && email.includes(".") && password.length > 5) {
      setIsValidInputs(true);
    }
  }, [email, password, setIsValidInputs]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user && user?.email) {
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
    if ((email, password)) {
      dispatch(login({ email, password }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section >
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p className="mb-5">Login and Create your Goals</p>
      <form
        onSubmit={submitHandler}
        className="form-container"
        disabled={!isValidInputs}
      >
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
            min={6}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn mb-5" disabled={!isValidInputs}>
            Submit
          </button>
        </div>
        <p>
          Don't have account?{" "}
          <Link to={"/register"} className="link">
            register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
