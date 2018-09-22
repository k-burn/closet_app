const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        $http({
            method: 'GET', 
            url: 'http://swapi.co/api/people/2/'
        }).then(function(response){
          console.log(response.data);
        });
    } else {
        res.sendStatus(401);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;