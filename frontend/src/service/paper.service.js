import axios from "axios";

export const getPapers = async () => {
  let res = await axios.get(`http://localhost:8000/api/paper`);
  return res?.data;
};

export const downloadPaper = async (id) => {
  let res = await axios.get(`http://localhost:8000/api/paper/download/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "arraybuffer",
  });
  return res?.data;
};
