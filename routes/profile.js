require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// REQUIRE MODELS
var User = require('../models/user');
var Trip = require('../models/trip');
var Destination = require('../models/destination');


//GET ROUTE
router.get('/profile', function(req, res){
	Trip.find({ user_id: req.query.user }, function(err, trip){
		if(err){
			console.log(err);
		}
		res.send(trip);
	});
});

module.exports = router;