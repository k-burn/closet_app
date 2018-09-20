const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "garments";`;
        pool.query(queryText)
            .then(response => res.send(response.rows))
            .catch(error => res.sendStatus(500));
    } else {
        res.sendStatus(401);
    }
});

router.get('/tops', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "garments"
                            WHERE "garment_type" = 'top';`;
        pool.query(queryText)
            .then(response => res.send(response.rows))
            .catch(error => res.sendStatus(500));
    } else {
        res.sendStatus(401);
    }
});

router.get('/bottoms', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "garments"
                            WHERE "garment_type" = 'bottom';`;
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
    if (req.isAuthenticated()) {
        console.log('in garment POST');
        console.log(req.body);
        const garment = req.body;
        const queryText = `INSERT INTO "garments" ("garment_name", "user_id", "garment_type", "image_path", "comfort_level", "wash_instructions", "red", "orange", "yellow", "green", "blue", "purple", "white", "black", "grey", "pink", "brown", "tan", "winter", "spring", "summer", "fall") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`;
        pool.query(queryText, [garment.name, req.user.id, garment.type, garment.url, garment.comfort, garment.wash_instructions, garment.red, garment.orange, garment.yellow, garment.green, garment.blue, garment.purple, garment.white, garment.black, garment.grey, garment.pink, garment.brown, garment.tan, garment.winter, garment.spring, garment.summer, garment.fall])
        .then((result)=>{
        res.sendStatus(201);
        })
        .catch((error)=>{
        console.log('error making feedback POST', error);
        res.sendStatus(500);
        })
    }
    else {
        res.sendStatus(403) //unauthorized message
    }

});

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('DELETE api/delete', req.params.id);
        const idOfGarmentToDelete = req.params.id;
        const queryText = `DELETE FROM "garments" WHERE "id" = $1;`;
        pool.query(queryText, [idOfGarmentToDelete]).then((result)=>{
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('Error in delete garment route', error);
            res.sendStatus(500);
        })
    }
    else {
        res.sendStatus(403)//unauthorized
    }
});

module.exports = router;