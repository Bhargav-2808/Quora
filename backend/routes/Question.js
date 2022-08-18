import questionDB from "../models/Question.js";
import paperDB from "../models/Paper.js";
import {readFileSync} from "fs";
import path from "path";

const questionRouter= async (req, res) => {
  //console.log(req?.body?.category);
  //console.log(req.body?.question);
  try {
    await questionDB
      .create({
        questionName: req.body.question,
        category: req.body.category?req.body.category:"General"
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
};

const getData= async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", //collection to join
            localField: "_id", //field from input document
            foreignField: "questionId",
            as: "allAnswers", //output array field
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
};

const getCategoryData= async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $match:{
            category:req.params.category
          }
        },
        {
          $lookup: {
            from: "answers", //collection to join
            localField: "_id", //field from input document
            foreignField: "questionId",
            as: "allAnswers", //output array field
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
};

const questionRouterWithImage= async (req, res) => {
  try {
    await questionDB
      .create({
        questionName: req.body.question,
        category: req.body.category?req.body.category:"General",
        user: req.body.user,
        imagePath:req.file.filename
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
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
      message: "Error while adding question",
    });
  }
};

const getPapers = async(req,res) =>{
  try {
    const papers = await paperDB.find();
    if(papers.length){
      res.status(200).json({data:papers,message:"Paper's found"});
    }
    res.status(404).json({message:"No paper found"})
  } catch (error) {
    res.status(500).json({Message:"Something Went Wrong",error:error.message});
  }
};

const downloadPaper = async(req,res) =>{
  try {
    const paper = await paperDB.findOne({_id:req.params.id});
    if(paper){
      const paperPDF = readFileSync(`../frontend/uploads/papers/${paper.pdfPath}`);
      if(paperPDF){
        res.setHeader("Content-Disposition", `attachment; filename=${paper.paperName}.pdf`);
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        res.set("Content-Type", "application/pdf");
        res.status(200).send(paperPDF);
      }
      else{
        res.status(500).json({Message:"Unable to download"});
      }
    }
    else{
      res.status(404).json({message:"No paper found"})
    }
  } catch (error) {
    res.status(500).json({Message:"Something Went Wrong",error:error.message});
  }
};

export {questionRouter,getData,getCategoryData,questionRouterWithImage,getPapers,downloadPaper};
