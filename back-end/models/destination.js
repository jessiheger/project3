var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model for each destination ( should not include any user-specifc )
var destinationSchema = new Schema (
	{
		tripID: String,
		city: String,
		state: {
			type: String, 
			required: false
			},
		country: String,
		landmark: {
			type: String, 
			required: false
			},
		lat: {
			type: Number, 
			required: false
			},
		lng: {
			type: String, 
			required: false
			}
	// 		,
	// 	purpose: {
	// 		type: String,
	// 		required: false
	// 	},
	// 	note: String
	// }
);

var Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
