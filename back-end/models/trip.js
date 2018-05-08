var Destination 	= require('./destination.js');
var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;


// Model for each service
var tripSchema = new Schema ({
	name: String,
	destinations: [Destinations.schema],
	});

module.exports = mongoose.model('Trip', tripSchema);;
