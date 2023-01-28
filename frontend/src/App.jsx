import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/redirect/RequireAuth";
import NotRequireAuth from "./components/redirect/NotRequireAuth";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<RequireAuth />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<NotRequireAuth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </>
  );
}

export default App;
