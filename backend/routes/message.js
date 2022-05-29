const express=require("express");
const db = require("../modules/dbQuery");
const router=express.Router();

//getAll
router.get("/",(req,res)=>{
    db.query("SELECT message.id as msgid, user.id as userid, name, email, phone_num, message, subject FROM message INNER JOIN user ON message.userid = user.id",(d)=>{
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
    const data = req.body;
    db.query(`INSERT INTO message (message, subject, userid) VALUES ('${data.message}', '${data.subject}', ${data.userid})`, (d) => {
        console.log(d);
        res.json(d);
    })
})

//deletingOne
router.delete("/:id",(req,res)=>{
    db.query(`DELETE FROM message WHERE id=${req.params.id}`, (d) => {
        console.log(d);
        res.json(d);
    })
})

module.exports=router;