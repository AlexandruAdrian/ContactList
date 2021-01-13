import React, { useState, useContext } from "react";
// Components
import { Link } from "react-router-dom";
import "./nav.css";
// Context
import { AuthContext } from "../../../contexts/authContext.jsx";
// Hooks
import { useHistory } from "react-router-dom";

const Nav = ({ user }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.replace("/login");
  };

  return (
    <nav className="navbar fixed-top bg-primary shadow-sm">
      <Link to="/">
        <div className="navbar-brand text-white">Contacts</div>
      </Link>
      <div className="text-white profile" onClick={toggleShow}>
        {user}
        <Link
          to="/login"
          className={`logout ${!show && "visibility-hidden"}`}
          onClick={handleLogOut}
        >
          <button className="btn btn-danger">Logout</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
