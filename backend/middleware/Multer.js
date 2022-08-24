import multer from 'multer';

const imageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../frontend/src/uploads/images");
    },
    filename:(req,file,cb)=>{
        const extension=file.originalname.slice(file.originalname.lastIndexOf("."));
        // const fileName=req.body.questionId 
        cb(null,Date.now()+extension);
    }
})

const paperStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../frontend/src/uploads/papers");
    },
    filename:(req,file,cb)=>{
        const extension=file.originalname.slice(file.originalname.lastIndexOf("."));
        // const fileName=req.body.questionId 
        cb(null,Date.now()+extension);
    }
})

const imageStore = multer({storage:imageStorage});
const paperStore = multer({storage:paperStorage});

export {imageStore,paperStore};