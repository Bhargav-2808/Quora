import answerDB from "../models/Answer.js";

const answerRouter= async (req, res) => {
  try {
    await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
};

const answerRouterWithImage= async (req, res) => {
  console.log(req.file);
  try {
    await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
        imagePath:req.file.filename
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    console,log(e);
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

export {answerRouter,answerRouterWithImage};
