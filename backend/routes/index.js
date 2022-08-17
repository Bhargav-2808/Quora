import { Router } from "express";
import { imageStore,paperStore } from "../middleware/Multer.js";
const router = Router();

import {questionRouter,getData,getCategoryData,questionRouterWithImage,getPapers,downloadPaper} from "./Question.js";
import {answerRouter,answerRouterWithImage} from "./Answer.js";
import {loginRouter,registerRouter} from "./Login.js";
import {sendOTP,verifyOtpAndUpdate} from "./Password.js"
import {deleteQuestion,deleteAnswer,uploadPaper,deletePaper} from "./Admin.js"


// router.get("/", (req, res) => {
//   res.send("This api is reserved for quora clone");
// });

router.get("/",getData)
router.get("/question/:category",getCategoryData)
router.get("/paper",getPapers)
router.get("/paper/download/:id",downloadPaper)
router.post("/login",loginRouter)
router.post("/otp",sendOTP)
router.post("/verify/:token",verifyOtpAndUpdate)
router.post("/register",registerRouter)
router.post("/questions", questionRouter);
router.post("/questions/image", imageStore.single('questionImage'), questionRouterWithImage);
router.post("/answers", answerRouter);
router.post("/answers/image", imageStore.single('answerImage'),answerRouterWithImage);
router.delete("/admin/delete/question/:id",deleteQuestion);
router.delete("/admin/delete/answer/:id",deleteAnswer);
router.post("/admin/add/questionpaper",paperStore.single('paperPdf'),uploadPaper);
router.delete("/admin/delete/questionpaper/:id",deletePaper);
export default router;
