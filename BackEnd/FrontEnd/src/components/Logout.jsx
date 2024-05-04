import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout");
      localStorage.removeItem("ChatUser");
      Cookies.remove("jwt");
      setAuthUser(null);
      setLoading(false);
      alert("Logged out successfully");
    } catch (err) {
      if (err.res) {
        alert(err.message);
      }
    }
  };

  return { loading, logout };
};

export default useLogout;
