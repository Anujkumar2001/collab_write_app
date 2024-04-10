import React, { useState } from "react";
import "../style/signup.css";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const createAccount = async () => {
    try {
      const res = await axios.post(`${apiUrl}/user/signup`, {
        name,
        username,
        email,
        password,
      });
      if (res.status == 201) {
        navigate("/login");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSIgnupBtn = () => {
    if (name && username && email && password) {
      setLoading(true);
      createAccount();
    } else {
      console.log("all filed are required");
    }
  };

  return (
    <div className="wrapper">
      <div className="signup_container">
        <h1>SignUp</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="signup_content"
        >
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            placeholder="enter your name"
            onChange={handleNameInput}
            value={name}
            required
          />
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="enter your username"
            onChange={handleUsernameInput}
            value={username}
            required
          />
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            placeholder="enter your email"
            onChange={handleEmailInput}
            value={email}
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
          <button className="signup_btn" onClick={handleSIgnupBtn}>
            {loading ? "loading..." : "signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
