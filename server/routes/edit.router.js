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

//update movie title and description in DB if edited
router.put("/:id", (req, res) => {
  console.log('in edit router',req.body);
console.log("in router put with:",req.body.movieTitle, req.body.sendId, req.body.movieDescription);
  const queryText = `UPDATE "movies" SET "description" = '${req.body.movieDescription}', "title" = '${req.body.movieTitle}' WHERE id='${req.body.sendId}';`;
  pool.query(queryText)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error changing description", err);
      res.sendStatus(500);
    });
});


module.exports = router;