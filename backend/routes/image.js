const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const multer=require('multer');

//uploadLogic
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads');
  },
  filename:(req,file,cb)=>{
    console.log(file.fieldname);
    const uniqueSuffix=Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,`${file.fieldname}${uniqueSuffix}${path.extname(file.originalname)}`);
  }
})
const upload=multer({storage:storage});

//routes
router.post("/", upload.single("image"), function (req, res) {
  res.json({
    "status":"Posted successfully",
    image_url:`http://localhost:3000/photos/${req.file.filename}`
  });
});


module.exports = router;
