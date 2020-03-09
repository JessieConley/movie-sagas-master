const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all movies
router.get('/', (req, res) => {
  console.log("in server /display/GET");
  const queryText = `SELECT * FROM "movies" 
  JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movies_id" 
  JOIN "genres" ON "genres"."id" = "movies_genres"."genres_id" ORDER BY "movies"."id";`;

  //I know this query will get one movie to display at a time, but I lose my genres
  // const queryText = `SELECT * FROM "movies"`;
  pool.query(queryText)
    .then(result => {
          res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting query', error);
      res.sendStatus(500);
    });

});

router.get('/:movie_id/genres', (req, res) => {
    console.log("in server/:movie_id/genres GET");
    const queryText = `select * from "genres"
  join "movies_genres" on "genres"."id" = "movies_genres"."genres_id"
  where "movies_genres"."movies_id" = ${req.params.movie_id};`;
   pool.query(queryText)
    .then(result => {
          res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting query', error);
      res.sendStatus(500);
    });

})




module.exports = router;

