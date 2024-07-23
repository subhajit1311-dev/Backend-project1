import multer from "multer" 
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //file access korar jonno e multer ba express use kora hoy
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //file er original name use na korai better karon user eki namer onek file create kore dile then error ase 
    }
  })
  
  export const upload = multer({ storage,})

  