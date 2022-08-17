import  mongoose  from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  category:String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  imagePath: String,
  user: Object,
});

export default mongoose.model("Questions", QuestionSchema);
