import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../contextProvider/ContextProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    token,
    setToken,
    setCurrentUserId,
    currentUserId,
    SetLoggedUsername,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  //   const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const userLogin = async () => {
    try {
      const res = await axios.post(`${apiUrl}/user/login`, {
        username,
        password,
      });

      setToken(res.data.token);
      setCurrentUserId(res.data._id);
      SetLoggedUsername(res.data.username);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginBtn = () => {
    userLogin();
  };
  return (
    <div className="wrapper">
      <div className="signup_container">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="signup_content"
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="enter your username"
            onChange={handleUsernameInput}
            value={username}
            required
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            placeholder="enter your password"
            onChange={handlePasswordInput}
            value={password}
            required
          />
          <button className="signup_btn" onClick={handleLoginBtn}>
            {loading ? "loading..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
