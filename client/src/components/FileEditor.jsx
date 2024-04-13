import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../contextProvider/ContextProvider";
import "../style/fileEditor.css";
import useDebounce from "../hooks/useDebounce";

const FileEditor = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { fileId } = useParams();
  const { currentUserId, token } = useContext(AuthContext);

  const [fileData, setFileData] = useState({});
  const [textAreaContent, setTextAreaContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [currentUserIdFromIo, setCurrentUserIdFromIo] = useState("");
  const debouncedTextContent = useDebounce(textAreaContent, 500);

  const getFile = async () => {
    try {
      const res = await axios.post(`${apiUrl}/file/get_file_by_id`, {
        fileId: fileId,
      });
      setFileData(res.data);
      setTextAreaContent(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getFile();
    }
  }, []);

  useEffect(() => {
    let socket = io("http://localhost:8000");

    socket.emit("join", { fileId, currentUserId });
    socket.on("currentUserId", (currentUserId) => {
      setCurrentUserIdFromIo(currentUserId);
    });

    // Listen for documentContent event
    socket.on("documentContent", (newContent) => {
      if (currentUserIdFromIo == currentUserId) {
        setTextAreaContent(newContent);
        // alert("alert message");
      }
    });
    // send updating text  to server----------
    socket.emit("updateDocument", { debouncedTextContent, fileId });

    return () => {
      // Disconnect socket when component unmounts
      socket.disconnect();
    };
  }, [debouncedTextContent]);

  const handleTextArea = (e) => {
    setTextAreaContent(e.target.value);
  };

  const updateFile = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${apiUrl}/file/update`, {
        fileId: fileId,
        content: textAreaContent,
        name: fileData.name,
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success("Content updated successfully", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user`);
      setAllUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSelectdUser = async (e) => {
    try {
      const res = await axios.post(`${apiUrl}/file/share_file_to_user`, {
        fileId: fileId,
        userId: e.target.value,
      });

      if (res.status === 200) {
        toast.success("File shared successfully", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fileEditorContainer">
      <ToastContainer />
      <h1>{fileData.name}</h1>
      <div className="allUser">
        <h2>Share with</h2>
        <select name="" id="" onChange={handleSelectdUser}>
          <option value="" disabled selected hidden>
            Select an option
          </option>
          {allUser.map((el) =>
            el._id !== currentUserId ? (
              <option key={el._id} value={el._id}>
                {el.name}
              </option>
            ) : null
          )}
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
      <button className="updateBtn" onClick={updateFile}>
        {loading ? "Loading..." : "Update"}
      </button>
    </div>
  );
};

export default FileEditor;
