import "./App.css";

import Signin from "./pages/forms/Signin";
import UserRegister from "./pages/forms/UserRegister";
import AdminRegister from "./pages/forms/AdminRegister";
import CreateComplaint from "./pages/forms/CreateComplaint";
import ComplaintsUser from "./pages/Signedin/ComplaintsUser";
import ComplaintsAdmin from "./pages/Signedin/ComplaintsAdmin";

import { Navigate, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
export const Context = createContext();

function App() {
  const [isSigned, setIsSigned] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    setIsSigned(JSON.parse(localStorage.getItem("isSigned")));
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);
  return (
    <Context.Provider
      value={{ isSigned, setIsSigned, currentUser, setCurrentUser }}
    >
      <Routes>
        <Route
          path="/"
          element={
            isSigned ? (
              currentUser.role === "user" ? (
                <Navigate to={"/user"} />
              ) : (
                <Navigate to={"/admin"} />
              )
            ) : (
              <Signin />
            )
          }
        />
        <Route path="/signupUser" element={<UserRegister />} />
        <Route path="/signupAdmin" element={<AdminRegister />} />
        <Route
          path="/user"
          element={!isSigned ? <Navigate to={"/"} /> : <ComplaintsUser />}
        />
        <Route
          path="/admin"
          element={!isSigned ? <Navigate to={"/"} /> : <ComplaintsAdmin />}
        />
        <Route path="/createComplaint" element={<CreateComplaint />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
