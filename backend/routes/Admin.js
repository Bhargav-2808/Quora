import questionDB from "../models/Question.js";
import answerDB from "../models/Answer.js";
import paperDB from "../models/Paper.js";
import {unlink} from 'fs'

const deleteQuestion = async (req,res) =>{
    const questionID = req.params.id;
    try {
        const questionImage = await questionDB.findOne({_id:questionID});
        if(questionImage.imagePath){
            unlink(`../frontend/src/uploads/images/${questionImage.imagePath}`,(err)=>{
                if (err) throw err;
                console.log(err);
            })
        }
        const removeQuestion = await questionDB.findOneAndDelete({_id:questionID});
        const answerImage = await answerDB.find({questionId: questionID});
        if(answerImage.length){
            let imageArray = new Array();
            for(let answer of answerImage){
                if(answer.imagePath){
                    imageArray.push(answer.imagePath);
                }
            }
            for(let image of imageArray){
                unlink(`../frontend/src/uploads/images/${image}`,(err)=>{
                    if (err) throw err;
                    console.log(err);
                });
            }
        }
        const removeAnswer = await answerDB.deleteMany({ questionId: questionID});
        if(removeAnswer && removeQuestion){
            return res.status(200).json({Message:"Question Deleted"});
        }
        res.status(500).json({Message:"Something Went Wrong"});
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error:error.message});
    }
};

const deleteAnswer = async (req, res) => {
  const answerID = req.params.id;
  try {
    const answerImage = await answerDB.findOne({ _id: answerID });
    if (answerImage.imagePath) {
      unlink(
        `../frontend/src/uploads/images/${answerImage.imagePath}`,
        (err) => {
          if (err) throw err;
          console.log(err);
        }
      );
    }
    const removeAnswer = await answerDB.deleteOne({ _id: answerID });
    if (removeAnswer) {
      return res.status(200).json({ Message: "Answer Deleted" });
    }
    res.status(500).json({ Message: "Something Went Wrong" });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Something Went Wrong", error: error.message });
  }
};

const uploadPaper =async(req,res)=>{
    try {
        const paperName = req.body.paperName;
        const paperPDF = req.file.filename;
        const newPaper = await paperDB.create({
            paperName,
            pdfPath:paperPDF
        })
        if(newPaper){
            return res.status(200).json({Message:"Paper Added"});
        }
        res.status(500).json({Message:"Something Went Wrong"});
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error:error.message});
    }
};

const deletePaper =async(req,res)=>{
    try {
        const paperID = req.params.id;
        const paper = await paperDB.findOne({_id:paperID});
        if(paper){
            unlink(`../frontend/src/uploads/papers/${paper.pdfPath}`,(err)=>{
                if (err) throw err;
                console.log(err);
            })
            const removePaper = await paperDB.deleteOne({ _id:paperID });
            if(removePaper){
                return res.status(200).json({Message:"Paper Deleted"});
            }
        }
        res.status(404).json({Message:"No Paper Found"});
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error:error.message});
    }
}

export {deleteQuestion,deleteAnswer,uploadPaper,deletePaper};