import React, { useEffect } from "react";
import "./App.css";
import NLogin from "./components/auth/NLogin";
import SignUp from "./components/auth/SignUp";
import Quora from "./components/Quora";
import { Route, Routes, useNavigate } from "react-router-dom";
import SendOTP from "./components/auth/SendOTP";
import VerifyOTP from "./components/auth/VerifyOTP";


const Protected = (props) => {
  const { Comp } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
  });
  return (
    <>
      <Comp />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Protected Comp={Quora} />} />
        <Route exact path="/sendotp" element={<SendOTP  />} />
        <Route exact path="/verifyotp/:token" element={<VerifyOTP  />}  />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<NLogin />} />
      </Routes>
    </div>
  );
}

export default App;
