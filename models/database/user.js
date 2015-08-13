var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashed_pwd: String,
		roles: [String],
	});

module.exports = userSchema;