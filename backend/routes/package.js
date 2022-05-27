const express = require("express");
const router = express.Router();
const db = require("../modules/dbQuery");

//getAll {localhost:3000/package}
router.get("/", (req, res) => {
  db.query(`SELECT * FROM PACKAGE`, (d) => {
    if (d.row.length === 0) {
      res.status(404).json([]);
    } else {
      res.json(d.row);
    }
  });
});

//getbyID {localhost:3000/package/id}
router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM PACKAGE WHERE id=${req.params.id}`, (d) => {
    if (d.row.length === 0) {
      res.status(404).json([]);
    } else {
      res.json(d.row);
    }
  });
});

//getbyName {localhost:3000/package/name/pkgName}
router.get("/name/:id", (req, res) => {
  db.query(`SELECT * FROM PACKAGE WHERE place=${req.params.id}`, (d) => {
    if (d.row.length === 0) {
      console.log("Entering here");
      res.status(404).json([]);
    } else {
      res.json(d.row);
    }
  });
});

//createOne
/*
req data should be like this
{
  name:"Place name",
  des:"Description",
  price:price,
  imgurl:"image url"
}
*/
router.post("/", (req, res) => {
  const data = req.body;
  db.query(
    `INSERT INTO package (place,description,price,image) values ("${data.name}","${data.des}",${data.price},"${data.imgurl}")`,
    (d) => {
      console.log(d);
      res.json(d);
    }
  );
});

//updateOne
/*
req data should be like this
{
  name:"Place name",
  des:"Description",
  price:price,
  imgurl:"image url"
}
*/
router.patch("/:id", (req, res) => {
  const data=req.body;
  db.query(
    `UPDATE package SET place="${data.name}",description="${data.des}",price=${data.price},image="${data.imgurl}" where id=${req.params.id}`,
    (d) => {
      console.log(d);
      res.json(d);
    }
  );
});

//deletingOne
router.delete("/:id", (req, res) => {
  db.query(
    `DELETE FROM PACKAGE WHERE ID=${req.params.id}`,
    (d) => {
      console.log(d);
      res.json(d);
    }
  );
});

module.exports = router;
