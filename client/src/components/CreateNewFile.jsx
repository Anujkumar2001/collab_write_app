import React, { useState, useContext, useEffect } from "react";
import "../style/CreateNewFile.css";
import axios from "axios";
import AuthContext from "../contextProvider/ContextProvider";
import { useNavigate } from "react-router-dom";

const CreateNewFile = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [textarea, setTextArea] = useState("");

  // check is user is not loggedin move to home page ---
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;

  const { token, currentUserId, loggedUsername } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const createFileFun = async () => {
    try {
      const res = axios.post(
        `${apiUrl}/file/create`,
        {
          name: fileName,
          content: textarea,
          user: currentUserId,
          createdBy: loggedUsername,
        },
        { headers: headers }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateBtn = () => {
    createFileFun();
  };

  const handleInput = (e) => {
    setFileName(e.target.value);
  };
  const handleTextArea = (e) => {
    setTextArea(e.target.value);
  };
  return (
    <div className="create_file_container">
      <h1 style={{ fontWeight: "600" }}>Create File</h1>
      <div className="file_content">
        <label htmlFor="name">file name:</label>
        <input
          type="text"
          placeholder="Enter Your File Name"
          id="name"
          value={fileName}
          onChange={handleInput}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          name=""
          id="content"
          cols="30"
          rows="10"
          placeholder="Your Content"
          value={textarea}
          onChange={handleTextArea}
        ></textarea>
        <button className="create-btn" onClick={handleCreateBtn}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateNewFile;
