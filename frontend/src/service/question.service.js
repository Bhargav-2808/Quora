import axios from "axios";

export const postQuestions = async (body) =>{
    let res = await axios.post("http://localhost:8000/api/questions", body);
    return res?.data;
}