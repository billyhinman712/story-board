//use env variables
require('dotenv').config();

//require needed modules
var passport = require('passport');
var passportFacebookStratagy = require('passport-facebook').Strategy;
var passportLocalStratagy = require('passport-local').Strategy;

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
	db.user.findOne({
		where: {email: email}
	}).then(function(foundUser){
		if(!foundUser || !foundUser.isValidPassword(password)){
			callback(null, null);
		}
		else{
			callback(null, foundUser);
		}
	}).catch(function(err){
		callback(err, null);
	});
}));

passport.use(new passportFacebookStratagy({
	clientID: process.env.FB_APP_ID,
	clientSecret: process.env.FB_APP_SECRET,
	callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
	profileFields: ['id', 'email', 'displayName'],
	enableProof: true
}, function(accessToken, refreshToken, profile, done){
	//see if we have email address we can use for identifying user
	var facebookEmail = profile.emails ? profile.emails[0].value : null;

	//see if email existes in the users table
	db.user.findOne({
		where: {email: facebookEmail}
	}).then(function(existingUser){
		if(existingUser && facebookEmail){
			//this is a returning user - update facebook id and token
			existingUser.updateAttributes({
				facebookId: profile.id,
				facebookToken: accessToken
			}).then(function(updatedUser){
				done(null, updatedUser);
			}).catch(done);
		}
		else{
			//the person is new user, create an entry for them
			//parse the user's name
			var usernameArr = profile.displayName.split(' ');

			db.user.findOrCreate({
				where: {facebookId: profile.id},
				defaults: {
					facebookToken: accessToken,
					email: facebookEmail,
					firstname: usernameArr[0],
					lastname: usernameArr[usernameArr.length - 1],
					admin: false,
					image: 'https://png.icons8.com/ios/1600/person-female-filled.png',
					dob: profile.birthday
				}
			}).spread(function(user, wasCreadted){
				if(wasCreated){
					//this was expected
					done(null, user);
				}
				else{
					//this user is not new, this could happen if user changed email on facebook since last login with you
					user.facebookToken = accessToken;
					user.email = facebookEmail;
					user.save().then(function(updatedUser){
						done(null, updatedUser);
					}).catch(done);
				}
			});
		}
	})
}));

module.exports = passport;