import questionDB from "../models/Question.js";
import answerDB from "../models/Answer.js";

const deleteQuestion = async (req,res) =>{
    const questionID = req.params.id;
    const removeQuestion = await questionDB.findOneAndDelete({_id:questionID});
    const removeAnswer = await answerDB.deleteMany({ questionId: questionID});
    if(removeAnswer && removeQuestion){
        return res.status(200).json({Message:"Question Deleted"});
    }
    res.status(500).json({Message:"Something Went Wrong"});
};

const deleteAnswer = async(req,res) =>{
    const answerID = req.params.id;
    try {
    const removeAnswer = await answerDB.deleteOne({ _id:answerID });
    console.log(removeAnswer);
    if(removeAnswer){
        return res.status(200).json({Message:"Answer Deleted"});
    }
    res.status(500).json({Message:"Something Went Wrong"});
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error});
    }
    
};
export {deleteQuestion,deleteAnswer};