import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve authUser from cookies or localStorage
  const initialAuthUser =
    Cookies.get("jwt") || localStorage.getItem("ChatUser");

  // Parse the authUser if it exists, otherwise initialize with an empty object
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
