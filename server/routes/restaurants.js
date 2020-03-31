/*
 * All routes for Restaurants are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /restaurants and /menus
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    let query = `
    SELECT * FROM restaurants INNER JOIN menus ON restaurants.id = menus.restaurant_id ORDER BY restaurants.start_time;`;
    db.query(query)
      .then(data => {
        const restaurants = data.rows;
        res.json({ restaurants });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/distance", (req, res) => {
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
  ORDER BY start_time, end_time, distance
  LIMIT 20;`;
    db.query(query, [43.644121, -79.402172, 43.644121])
      .then(data => {
        const restaurants = data.rows;
        res.json({ restaurants });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
