import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../store/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <h3 className="logo">
        <Link to="/">GoalSetter</Link>
      </h3>
      <ul>
        {!!user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button className="btn btn-logout" onClick={logoutHandler}>
                Logout
                <FaSignInAlt className="ml-2" />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser className="mr-2" /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
