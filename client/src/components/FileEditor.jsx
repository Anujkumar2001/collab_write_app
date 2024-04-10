import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import "../style/fileEditor.css";
import AuthContext from "../contextProvider/ContextProvider";
import { io } from "socket.io-client";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

const FileEditor = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { fileId } = useParams();
  const { currentUserId, token } = useContext(AuthContext);

  const [docId, setDocId] = useState("");
  const [fileData, setFileData] = useState([]);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const getFile = async () => {
    try {
      let res = await axios.post(`${apiUrl}/file/get_file_by_id`, {
        fileId: fileId,
      });
      setFileData(res.data);
      console.log(fileData);
      setTextAreaContent(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getFile();
  }, []);

  let socket = io("http://localhost:8000");

  // join room --------
  socket.emit("join", fileId);

  useEffect(() => {
    socket.on("documentContent", (newContent) => {
      setTextAreaContent(newContent);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTextArea = (e) => {
    setTextAreaContent(e.target.value);
    socket.emit("updateDocument", { fileId, content: e.target.value });
  };

  const updateFile = async (fileData) => {
    const res = await axios.put(`${apiUrl}/file/update`, {
      fileId: fileId,
      content: textAreaContent,
      name: fileData.name,
    });
    if (res.status === 200) {
      setLoading(false);
    }
  };

  // soket io logic -----------

  const getAllUser = async () => {
    const res = await axios.get(`${apiUrl}/user`);
    setAllUser(res.data);
  };

  useEffect(() => {
    getAllUser();
  }, []);
  const handleUpdateBtn = (fileData) => {
    updateFile(fileData);
    setLoading(true);
    console.log(loading);
  };

  const handleSelectdUser = async (e) => {
    try {
      const res = await axios.post(`${apiUrl}/file/share_file_to_user`, {
        fileId: fileId,
        userId: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fileEditorContainer">
      <h1>{fileData.name}</h1>
      <div className="allUser">
        <h2>share with</h2>
        <select name="" id="" onChange={handleSelectdUser}>
          <option value="" disabled selected hidden>
            Select an option
          </option>
          {allUser.map((el) => {
            return el._id !== currentUserId ? (
              <option value={el._id}>{el.name}</option>
            ) : null;
          })}
        </select>
      </div>
      <textarea
        name="message"
        id="message"
        cols="30"
        rows="10"
        onChange={handleTextArea}
        value={textAreaContent}
      ></textarea>
      <button
        className="updateBtn"
        onClick={() => {
          handleUpdateBtn(fileData);
        }}
      >
        {loading ? "loading..." : "Update"}
      </button>
    </div>
  );
};

export default FileEditor;
