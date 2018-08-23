//require needed modules
var passport = require('passport');
var passportLocalStratagy = require('passport-local').Stratagy;

//declare variables
var db = require('../models');

//provide serialize/deserialize functions so we can use session
passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	db.user.findById(id).then(function(user){
		callback(null, user);
	}).catch(function(err){
		callback(err, null);
	});
});

//do actual work of lopgging in
passport.use(new passportLocalStratagy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){
	db.user,findOne({
		where: {email: email}
	}).then(function(foundUser){
		if(!foundUser || !foundUser.isValidPassword(password)){
			callback('Invalid user or password', null);
		}
		else{
			callback(null, foundUser);
		}
	}).catch(function(err){
		callback(err, null);
	});
}));

module.exports = passports;