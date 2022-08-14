import axios from "axios";

export const deleteAnswers = async (id) => {
    let res = await axios.delete(
        `http://localhost:8000/api/admin/delete/answer/${id}`
      );
  return res?.data;
};

export const deleteQuestions = async (id) => {
  let res = await axios.delete(
    `http://localhost:8000/api/admin/delete/question/${id}`
  );
  return res?.data;
};
