// const express = require("express");
// const router = express.Router();
// // const axios = require("axios");

// router.get(`/description/:id`, (req, res) => {
//   console.log("in get description", req.params.id);
//   const queryText = `select * from "movies_genres"
//     join "movies" on "movies_genres"."movies_id" = "movies"."id"
//     join "genres" on "movies_genres"."genres_id" = "genres"."id";
//     where "movies_genres"."id"= $1`;
//   console.log("in description router.get", req.body);
//   pool
//     .query(queryText, [req.params.id])
//     .then(result => {
//       console.log(result.rows);
//       res.send(result.rows);
//     })
//     .catch(error => {
//       console.log("error in genre GET ID ", error);
//       res.sendStatus(500);
//     });
// });
// module.exports = router;
