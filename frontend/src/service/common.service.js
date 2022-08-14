import axios from "axios";
//const tokenInfo = JSON.parse(localStorage.getItem("token"));
export const sendotp = async (body) =>{
    let res = await axios.post("http://localhost:8000/api/otp", body);
    return res?.data;
}

export const verifyotp = async (body,token) =>{
    let res = await axios.post(`http://localhost:8000/api/verify/${token}`, body);
    return res?.data;
}