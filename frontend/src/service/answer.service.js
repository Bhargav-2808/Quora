import axios from "axios";

export const postAnswersImage = async (body) => {
  let res = await axios.post("http://localhost:8000/api/answers/image", body);
  return res?.data;
};

export const postAnswers = async (body) => {
  let res = await axios.post("http://localhost:8000/api/answers", body);
  return res?.data;
};
