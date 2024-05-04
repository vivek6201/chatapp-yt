import React from "react";
import Left from "./home/leftSlide/Left";
import Right from "./home/RightSlide/Right";
import Register from "./components/Register";
import Login from "./components/Login";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./components/context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex">
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}

export default App;
