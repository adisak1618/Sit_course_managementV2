var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var mongoose = require('mongoose');
var datauser = mongoose.model('user');
var flash = require('connect-flash');
// Passport configure

passport.use(new LocalStrategy(
	function(username, password, done){
		datauser.findOne({username: username}, function(err, collection){
			var authenticated = checkPWD(collection, password);
			if(err) {
				return done(err);
			}
			if(!collection) {
				return done(null, false, {message:'Oops! invalid username!'});
			}
			if(!authenticated) {
				return done(null, false, {message:'Oops! invalid password!'});
			}
			return done(null, authenticated);
		});
	}
));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

module.exports = passport;

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}

function checkPWD(data, pwd){
	if(!data){
		return false;
	}
	var salt = data.salt;
	// var password = hashPwd(salt, pwd);
	var password = data.hashed_pwd;
	if (!(password === data.hashed_pwd)) {
		return false;
	}
	return data;
}
