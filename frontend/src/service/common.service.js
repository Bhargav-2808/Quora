import axios from "axios";

export const sendotp = async (body) =>{
    let res = await axios.post("http://localhost:8000/api/otp", body);
    return res?.data;
}

export const verifyotp = async (body) =>{
    let res = await axios.post("http://localhost:8000/api/verify", body);
    return res?.data;
}