import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/auth/Login";
import NLogin from "./components/auth/NLogin";
import SignUp from "./components/auth/SignUp";
import Quora from "./components/Quora";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const Protected = (props)=>{
  const {Comp} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user")===null){
       navigate("/login");         
    }   
   });
  return(
    <>
      <Comp />
    </>
  )
}

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      {/* <h1>This is for testing</h1> */}
      {/* {user ? <Quora /> : <NLogin />} */}
      <Routes>
          <Route exact path='/' element={
          
           <Protected  Comp={Quora} />     }/>
          <Route exact path="/signup" element={<SignUp />}/>
          <Route exact path="/login" element={<NLogin />}/>
      </Routes>
    </div>
  );
}

export default App;
