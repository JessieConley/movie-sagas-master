const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all movies
router.get('/', (req, res) => {
  console.log("in server /display/GET");
  const queryText = `SELECT * FROM movies ORDER BY title ASC`;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting query', error);
      res.sendStatus(500);
    });
});



module.exports = router;

