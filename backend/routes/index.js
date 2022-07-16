import { Router } from "express";
const router = Router();

import {questionRouter,getData} from "./Question.js";
import answerRouter from "./Answer.js";
import loginRouter from "./Login.js";


// router.get("/", (req, res) => {
//   res.send("This api is reserved for quora clone");
// });

router.get("/",getData)
router.post("/login",loginRouter)
router.post("/questions", questionRouter);
router.post("/answers", answerRouter);

export default router;
