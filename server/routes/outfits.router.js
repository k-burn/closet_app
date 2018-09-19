const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT "saved_outfits"."id", "notes", "top_id","image_path" AS "top_url", "bottom_id",
                                (SELECT "image_path"
                                FROM "garments"
                                WHERE "garments"."id"="saved_outfits"."bottom_id") AS "bottom_url"
                            FROM "saved_outfits"
                            JOIN "garments"
                            ON "garments"."id" = "saved_outfits"."top_id";`;
        pool.query(queryText)
            .then(response => res.send(response.rows))
            .catch(error => res.sendStatus(500));
    } else {
        res.sendStatus(401);
    }
});

router.get('/random', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT "saved_outfits"."id", "notes", "top_id","image_path" AS "top_url", "bottom_id",
                                (SELECT "image_path"
                                FROM "garments"
                                WHERE "garments"."id"="saved_outfits"."bottom_id") AS "bottom_url"
                            FROM "saved_outfits"
                            JOIN "garments"
                            ON "garments"."id" = "saved_outfits"."top_id"
                            ORDER BY random()
                            LIMIT 1;`;
        pool.query(queryText)
            .then(response => res.send(response.rows))
            .catch(error => res.sendStatus(500));
    } else {
        res.sendStatus(401);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in garment POST');
    console.log(req.body);
    const garment = req.body;
  const queryText = `INSERT INTO "saved_outfits" ("outfit_name", "user_id", "outfit_type", "image_path", "comfort_level") VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(queryText, [garment.name, req.user.id, garment.type, garment.url, garment.comfort])
    .then((result)=>{
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log('error making feedback POST', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    console.log('DELETE api/delete', req.params.id);
    const idOfGarmentToDelete = req.params.id;
    const queryText = `DELETE FROM "saved_outfits" WHERE "id" = $1;`;
    pool.query(queryText, [idOfGarmentToDelete]).then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error in delete garment route', error);
        res.sendStatus(500);
    })
});

module.exports = router;