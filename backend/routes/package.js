const express = require("express");
const router = express.Router();
const db = require("../modules/dbQuery");
//getAll
router.get("/", (req, res) => {
  res.json({
    type: "Get All package",
  });
});

//getOne
router.get("/:id", (req, res) => {
  res.json({
    type: `Getting the package ${req.params.id}`,
  });
});

//createOne
router.post("/", (req, res) => {
  const data=req.body;
  db.query(
    `INSERT INTO package (place,description,price,image) values ("${data.name}","${data.des}",${data.price},"${data.imgurl}")`,
    (d) => {
        console.log(d);
        res.json(d);
    }
  );
});

//updateOne
router.patch("/:id", (req, res) => {
  res.json({
    type: `Updating done`,
  });
});

//deletingOne
router.delete("/:id", (req, res) => {
  res.json({
    type: `Deleting done`,
  });
});

module.exports = router;
