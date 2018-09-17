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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

router.delete('/:id', (req, res) => {
    console.log('DELETE api/delete', req.params.id);
    const idOfGarmentToDelete = req.params.id;
    const queryText = `DELETE FROM "garments" WHERE "id" = $1;`;
    pool.query(queryText, [idOfGarmentToDelete]).then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error in delete garment route', error);
        res.sendStatus(500);
    })
});

module.exports = router;