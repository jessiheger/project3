require('dotenv').config();
var app         	= express();
var bodyParser      = require('body-parser');
var express         = require('express');
var mongoose        = require('mongoose');
var passport        = require('./config/passportConfig');
var path  			= require('path');
var session         = require('express-session');
var flash           = require('connect-flash');

// Use statements
app.use(bodyParser.urlencoded({ extended: false}));

// define routes
app.get('/', function(req,res) { res.send('TEST': Home'); });
app.listen(process.env.PORT || 3000);