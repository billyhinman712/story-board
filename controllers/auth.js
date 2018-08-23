//require needed modules
var express = require('express');
var passport = require('../config/passportConfig');

//include models
var db = require('../models');

//declare a new route
var router = express.Router();

//define routes
router.get('/login', function(req, res){
	res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'login successful',
	failureRedirct: '/auth/login',
	failureFlash: 'Invalid credentials'
}));

router.get('/signup', function(req, res){
	res.render('auth/signup');
});

router.post('/signup', function(req, res){
	console.log(req.body);
	req.body.admin = false;
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: req.body
	}).spread(function(user, wasCreated){
		if(wasCreated){//this is expected behavior
			//automaticlly log user in
			passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'Successfully logged in!',
				failureRedirct: '/',
				failureFlash: 'oh Noes?'
			})(req, res);
		}
		else{//user messed up already have login
			req.flash('error', 'Please login');
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/auth/signup');
	});
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Successfully logged out!');
	res.redirect('/');
});

module.exports = router;