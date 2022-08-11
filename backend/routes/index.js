import { Router } from "express";
import { store } from "../middleware/Multer.js";
const router = Router();

import {questionRouter,getData,getCategoryData} from "./Question.js";
import {answerRouter,answerRouterWithImage} from "./Answer.js";
import {loginRouter,registerRouter} from "./Login.js";
import {sendOTP,verifyOtpAndUpdate} from "./Password.js"
import {deleteQuestion,deleteAnswer} from "./Admin.js"


// router.get("/", (req, res) => {
//   res.send("This api is reserved for quora clone");
// });

router.get("/",getData)
router.get("/:category",getCategoryData)
router.post("/login",loginRouter)
router.post("/otp",sendOTP)
router.post("/verify",verifyOtpAndUpdate)
router.post("/register",registerRouter)
router.post("/questions", questionRouter);
router.post("/answers", answerRouter);
router.post("/answers/image", store.single('answerImage'),answerRouterWithImage);
router.delete("/admin/delete/question/:id",deleteQuestion);
router.delete("/admin/delete/answer/:id",deleteAnswer);
export default router;
