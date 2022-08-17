import  mongoose  from "mongoose";

const paperSchema = new mongoose.Schema({
    paperName:{
        type:String
    },
    pdfPath:{
        type:String
    }
});

export default mongoose.model('paper',paperSchema);