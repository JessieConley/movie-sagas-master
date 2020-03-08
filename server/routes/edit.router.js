const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// return all movie genres
router.get('/', (req, res) => {
  console.log("in server /edit/ router GET");
   const queryText = `SELECT * FROM "genres" ORDER BY "name" ASC`;
  pool.query(queryText)
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log('Error getting genres', error);
          res.sendStatus(500);
      });
});

//update movie title and description upon edit
router.put('/:id', (req, res) => {
  console.log('in server /edit PUT', req.body, req.params);
  const queryText = `UPDATE "movies" SET "title" =$1, "description" =$2 WHERE id=$3;`;
  const queryValues = [
    req.body.change.edits.title,
    req.body.change.edits.description,
    req.params.id
  ];
  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error changing input category", err);
      res.sendStatus(500);
    });
});


module.exports = router;