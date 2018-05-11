require('dotenv').config();
var express         = require('express');
var request         = require('request');
var router          = express.Router();
var mongoose        = require('mongoose');



// var MAPBOX_KEY = process.env.MAPBOX_KEY;


// router.get('/worldview', function(req, res){
//     request(`https://api.mapbox.com/v4/mapbox.streets/1/0/0.png?access_token=${MAPBOX_KEY}`, function(err, res){

//         res.send('temporary stub');
//     })

// });

module.exports = router;
