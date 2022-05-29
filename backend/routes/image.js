const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const multer=require('multer');
const fs=require('fs');

//uploadLogic
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    console.log("hel");
    cb(null,'./uploads');
    console.log("hel");
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
  console.log("hel");
  res.json({
    "status":"Posted successfully",
    image_url:`${req.file.filename}`
  });
});

router.delete("/:filename",function(req,res){
  console.log("Delete request");
  const filepath=path.join(__dirname,`../uploads/${req.params.filename}`);
  console.log(filepath);
  try{
    fs.unlinkSync(filepath);
    res.status(200).json({
      message:"Success"
    })
  } catch(err){
    res.status(404).json({
      message:"File not found"
    })
    console.log(err);
  }
});


module.exports = router;
