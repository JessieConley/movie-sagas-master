const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();




router.put("/:id", (req, res) => {
  console.log("IN POST WITH:", req.body, req.params);
  const queryText = `UPDATE favorites SET "category_id" = $1 WHERE id=$2;`;
  const queryValues = Number(req.body.sendCat);
  pool
    .query(queryText, [queryValues, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error changing input category", err);
      res.sendStatus(500);
    });
});

module.exports = router;