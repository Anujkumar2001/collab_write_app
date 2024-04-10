import { useEffect, useState } from "preact/hooks";
import "./app.css";
import Home from "./pages/Home";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import FileEditor from "./components/FileEditor";
import CreateNewFile from "./components/CreateNewFile";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthContextProvider } from "./contextProvider/ContextProvider";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:fileId" element={<FileEditor />} />
          <Route path="/create_file" element={<CreateNewFile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
