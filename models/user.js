var bcrypt 		= require('bcrypt');
var mongoose 	= require('mongoose');
var Trip 		= require('./trip.js');

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: false
	},
	trip: [Trip.schema],
});

// Auth code from Project 2
userSchema.methods.isAuthenticated = function(password) {
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this : false;
}

userSchema.pre('save', function(next){
	if (!this.isModified('password')){
		next();
	}
	else {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});

module.exports = mongoose.model('User', userSchema);
