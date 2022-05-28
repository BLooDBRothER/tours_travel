const express=require("express");
const db = require("../modules/dbQuery");
const router=express.Router();

//getAll
router.get("/",(req,res)=>{
    db.query("SELECT * FROM BOOKING",(d)=>{
        res.json(d.row)
    });
})

//getOne
router.get("/:id",(req,res)=>{
    db.query(`SELECT * FROM BOOKING WHERE id=${req.params.id}`,(d)=>{
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
/*
{
    userid:int,
    packageid:int,
    booking_date:"varchar",
    departure_date:"varchar",
    arrival_date:"varchar",
    approved:(1 or 0)
}
*/
router.post("/",(req,res)=>{
    const data=req.body;
    db.query(
        `INSERT INTO booking (userid,packageid,booking_date,departure_date,arrival_date,approved) values (${data.userid},${data.packageid},"${data.booking_date}","${data.departure_date}","${data.arrival_date}",${data.approved})`,
        (d) => {
          console.log(d);
          res.json(d);
        }
    );
})

//updateOne
/*
{
    approved:(1 or 0)
}
*/
router.patch("/:id",(req,res)=>{
    db.query(
        `UPDATE booking SET approved=${req.body.approved}`,
        (d)=>{
            console.log(d);
            res.json(d);
        }
    )
});

//deletingOne
//localhost:3000/booking/2 with delete method in fetch
router.delete("/:id",(req,res)=>{
    db.query(
        `DELETE FROM BOOKING WHERE ID=${req.params.id}`,
        (d) => {
          console.log(d);
          res.json(d);
        }
    );
})

module.exports=router;