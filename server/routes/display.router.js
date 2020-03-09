const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all movies
router.get('/', (req, res) => {
  console.log("in server /display/GET");
  // const queryText = `SELECT * FROM "movies" 
  // JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movies_id" 
  // JOIN "genres" ON "genres"."id" = "movies_genres"."genres_id" ORDER BY "movies"."id";`;

  const queryText = `SELECT * FROM "movies"`;
  const queryText2 = `select * from "genres"
  join "movies_genres" on "genres"."id" = "movies_genres"."genres_id"
  where "movies_genres"."movies_id" = 1;`
  let movies = []
  pool.query(queryText)
    .then(result => {
      movies = result.rows;
          console.log(movies);
          movies.map(movie => {
            const queryText2 = `select * from "genres"
  join "movies_genres" on "genres"."id" = "movies_genres"."genres_id"
  where "movies_genres"."movies_id" = ${movie.id};`;
            pool.query(queryText2).then(result => {
              movies.genres = result.rows;
            });
          });
          res.send(movies);
    })
    .catch(error => {
      console.log('Error getting query', error);
      res.sendStatus(500);
    });

    
});



module.exports = router;

