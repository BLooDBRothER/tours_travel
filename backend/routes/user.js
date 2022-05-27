const express=require("express");
const db = require("../modules/dbQuery");
const router=express.Router();

//getAll
router.get("/",(req,res)=>{
    db.query("SELECT * FROM USER",(d)=>{
        res.json(d.row)
    });
})

//getOne
router.get("/:id",(req,res)=>{
    db.query(`SELECT * FROM USER WHERE id=${req.params.id}`,(d)=>{
        if(d.row.length===0){
            console.log("Entering here");
            res.status(404).json([]);
        }
        else{
            res.json(d.row);
        }
    });
})

//createOne
router.post("/",(req,res)=>{
    console.log(req.body);
    res.json({
        type:`Posting done`
    })
})

//updateOne
router.patch("/:id",(req,res)=>{
    res.json({
        type:`Updating done`
    })
})

//deletingOne
router.delete("/:id",(req,res)=>{
    res.json({
        type:`Deleting done`
    })
})

module.exports=router;