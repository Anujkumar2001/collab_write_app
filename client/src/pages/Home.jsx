import { useState, useEffect, useContext } from "react";
import "../style/home.css";
import axios from "axios";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AuthContext from "../contextProvider/ContextProvider";
import { IoCreateOutline } from "react-icons/io5";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [fileData, setFileData] = useState([]);
  const { token } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Example of an authorization header
  };

  const getFileData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/file/get_user_file_by_id`, {
        headers: headers,
      });
      console.log(res);

      if (!res.data) {
        return;
      }
      setFileData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFileData();
  }, []);

  return (
    <>
      {token ? (
        <div className="home_container">
          {/* <h1>your files</h1> */}

          {fileData?.map((el) => (
            <>
              <div className="files_container">
                <div className="file_image_section">{el.content}</div>

                <div key={el._id} className="file">
                  <div className="file_name">{el.name}</div>
                  <Link to={`/${el._id}`} className="create_file_btn">
                    <IoCreateOutline />
                  </Link>
                </div>

                <div className="file_details">
                  {el.shared ? <p className="sharedData">*</p> : ""}
                  <p className="cretedBy"> {el.createdBy}</p>
                </div>
              </div>
            </>
          ))}
          <Link to="create_file">
            <div
              className="files_container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Create new file
            </div>
          </Link>
        </div>
      ) : (
        <div className="before_login">
          <h1>welcome to Our Collabwirite Application.</h1>
          <p>Login and utilize my collaborative writing application.</p>
          <p></p>
        </div>
      )}
    </>
  );
};

export default Home;
