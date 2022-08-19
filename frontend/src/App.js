import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
// import NLogin from "./components/auth/NLogin";
// import SignUp from "./components/auth/SignUp";
// import Quora from "./components/Quora";
// import SendOTP from "./components/auth/SendOTP";
// import VerifyOTP from "./components/auth/VerifyOTP";
// import Admin from "./admin/Admin";

const NLogin = lazy(() => import("./components/auth/NLogin"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const Quora = lazy(() => import("./components/Quora"));
const SendOTP = lazy(() => import("./components/auth/SendOTP"));
const VerifyOTP = lazy(() => import("./components/auth/VerifyOTP"));
const Admin = lazy(() => import("./admin/Admin"));

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
    // if (user?.role === "student") {
    //   navigate("/");
    // }
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
      <Suspense
        fallback={
          <div className="d-flex justify-content-center mt-5">
            <div className="loading"> </div>
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Protected Comp={Quora} />} />
          <Route exact path="/sendotp" element={<SendOTP />} />
          <Route exact path="/verifyotp/:token" element={<VerifyOTP />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<NLogin />} />
          <Route
            exact
            path="/admin"
            element={<ProtectedAdmin Comp={Admin} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
