import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
