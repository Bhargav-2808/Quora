import multer from 'multer';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../frontend/uploads");
    },
    filename:(req,file,cb)=>{
        const extension=file.originalname.slice(file.originalname.lastIndexOf("."));
        // const fileName=req.body.questionId 
        cb(null,Date.now()+extension);
    }
})

const store = multer({storage});

export {store};