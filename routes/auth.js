require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res) {
  console.log('/auth/login post route', req.body);

  User.findOne({ email: req.body.email })
  .then(function(user) {
	if (!user || !user.password){
		return res.status(403).send("User not found!");
	}
	if (!user.authenticated(req.body.password)){
		return res.status(401).send("Invalid credentials");
	}
	var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
			expiresIn: 60*60*24
		});
		res.send({ user: user, token: token });
  })
  .catch(function(err) {
  	console.log("login err was ", err)
  	res.status(503).send("Database Error :(")
  });
});

router.post('/signmeup', function(req, res) {
  User.findOne({ email: req.body.email })
  .then(function(user) {
	if (user) {
		return res.status(400).send('User exists already');
	}
	// if user does not already exist, then yay! Make new user an account
	// req.body takes all fields from form and matches them with the name of the inputs in Signup component
	User.create(req.body)
	.then(function(createdUser){
	// Make a token and send it as JSON so the user can remain logged in (make sure you've installed jsonwebtoken and express-jwt)
	// toJSON comes from the user model
	// everythingin the {} is an option parameter of jwt.sign(); .sign = create a new token
		var token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
			expiresIn: 60*60*24 //expires in 24 hours, written in seconds
		});
		res.send({ user: createdUser, token: token })
		// ^ user and ^token (on left side of colon) could be called anything; now f-e has access to user and token
	})
	.catch(function(err){
		console.log('err is', err)
		res.status(500).send("Could not create user in DB")
	})
  })
  .catch(function(err) {
  // 500 errors are server errors, e.g. problem with database
  	res.status(500).send('Database Error!')
  })
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res) {
  // check header or url parameters or post parameters for token
  console.log('find user from token');
  res.send({ user: req.user });
});

module.exports = router;


























