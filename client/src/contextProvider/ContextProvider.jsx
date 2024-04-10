import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(""); // Define state here
  const [currentUserId, setCurrentUserId] = useState("");
  const [loggedUsername, SetLoggedUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        setCurrentUserId,
        currentUserId,
        SetLoggedUsername,
        loggedUsername,
      }}
    >
      {" "}
      {/* Pass state and setter function as value */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
