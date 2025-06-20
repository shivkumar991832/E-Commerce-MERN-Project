import multer from 'multer';

const storage = multer.diskStorage({
    //  destination : function(req, file, cb){
    //     cb(null, './public/temps')
    // },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    },
    

});

//upload middleware
export const upload = multer({
    storage : storage
})

