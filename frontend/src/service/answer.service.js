import axios from "axios"

export const postAnswers = async (body) =>{
    let res = await axios.post("http://localhost:8000/api/answers", body);
    return res?.data;
}