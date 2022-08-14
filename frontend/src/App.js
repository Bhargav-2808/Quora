import React, { useEffect } from "react";
import "./App.css";
import NLogin from "./components/auth/NLogin";
import SignUp from "./components/auth/SignUp";
import Quora from "./components/Quora";
import { Route, Routes, useNavigate } from "react-router-dom";
import SendOTP from "./components/auth/SendOTP";
import VerifyOTP from "./components/auth/VerifyOTP";
import Admin from "./admin/Admin";

const user = JSON.parse(localStorage.getItem("user"));

const Protected = (props) => {
  const { Comp } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  });
  return (
    <>
      <Comp />
    </>
  );
};

const ProtectedAdmin = (props) => {
  const { Comp } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }

    console.log(user?.role); 
    if (user?.role === "student") {
      navigate("/");
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
        <Route exact path="/admin" element={<ProtectedAdmin Comp={Admin} />} />
      </Routes>
    </div>
  );
}

export default App;
