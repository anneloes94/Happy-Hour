/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT * FROM restaurants INNER JOIN menus ON restaurants.id = menus.restaurant_id ORDER BY restaurants.start_time;`
    console.log('query', query);
    db.query(query)
      .then(data => {
        console.log('data', data);
        const restaurants = data.rows;
        res.json({ restaurants });
      })
      .catch(err => {
        res
        console.log(err.message)
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/test", (req, res) => {
    console.log(req.query)
    let query = `
    SELECT *, (
      6371 * acos (
        cos ( radians($1) )
        * cos( radians( lat ) )
        * cos( radians( lng ) - radians($2) )
        + sin ( radians($3) )
        * sin( radians( lat ) )
      )
    ) AS distance
  FROM restaurants
  ORDER BY start_time, distance
  LIMIT 20;`
    console.log('query', query);
    db.query(query, [43.644121, -79.402172, 43.644121])
      .then(data => {
        console.log('data', data);
        const restaurants = data.rows;
        res.json({ restaurants });
      })
      .catch(err => {
        res
        console.log(err.message)
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};


