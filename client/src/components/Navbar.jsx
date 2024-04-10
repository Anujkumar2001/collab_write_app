import React, { useContext } from "react";
import "../style/navbar.css";
import { Link } from "react-router-dom";
import AuthContext from "../contextProvider/ContextProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogutBtn = () => {
    setToken("");
    navigate("/");
  };

  return (
    <div className="navBar">
      <h2>collab-Write</h2>
      <ul className="navItems">
        <li>
          {token ? (
            <button onClick={handleLogutBtn}>logout</button>
          ) : (
            <Link to={"/signup"}>signUp</Link>
          )}
        </li>
        {!token && (
          <li>
            <Link to={"/login"}>login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
