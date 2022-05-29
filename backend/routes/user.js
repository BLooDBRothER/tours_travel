const express=require("express");
const db = require("../modules/dbQuery");
const router=express.Router();

//getAll
router.get("/all",(req,res)=>{
    db.query("SELECT * FROM USER",(d)=>{
        res.json(d.row)
    });
})

//getOneByCredential
router.post("/login",(req,res)=>{
    const data=req.body;
    db.query(`SELECT * FROM USER WHERE email="${data.email}" and password="${data.password}"`,(d)=>{
        if(d.row.length===0){
            console.log("Entering here");
            res.status(404).json([]);
        }
        else{
            res.status(200).json(d.row);
        }
    });
});

//getEmail
router.post("/isreg",(req,res)=>{
    db.query(`SELECT * FROM USER WHERE email="${req.body.email}"`,(d)=>{
        console.log(d);
        if(d.row.length===0){
            console.log("Entering here");
            res.json({"status":false});
        }
        else{
            res.json({"status":true});
        }
    });
});
//createOne
/*
{
    "email":varchar,
    "password":varchar,
    "name":varchar,
    "phone_num":int,
    "pincode":int,
    "area":varchar
}
*/
router.post("/",(req,res)=>{
    const data=req.body;
    db.query(
        `INSERT INTO user (email,password,name,phone_num,pincode,area) values ("${data.email}","${data.password}","${data.name}",${data.phone_num},${data.pincode},"${data.area}")`,
        (d) => {
          console.log(d);
          res.json(d);
        }
    );
})



module.exports=router;