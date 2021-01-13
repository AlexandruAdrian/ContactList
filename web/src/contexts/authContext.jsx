import React, { createContext, useState } from "react";

export const AuthContext = createContext(false);

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
