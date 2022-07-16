import  mongoose  from "mongoose";


const loginSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone:{
    type: Number,
  },
  college:{
    type:String,
  },
  password:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("login", loginSchema);
