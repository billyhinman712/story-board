//require needed modules
var express = require('express');
var db = require('../models');

//declare a new route
var router = express.Router();

//get the authorization helper function
var loggedIn = require('../middleware/loggedIn');

//define routes
router.get('/', loggedIn, function(req, res){
	res.render('auth/profile/index');
});

router.get('/stories', function(req, res){
	db.story.findAll().then(function(allStories){
		db.user.findAll().then(function(allUsers){
			res.render('profile/list', {stories: allStories, users: allUsers});
		});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});

module.exports = router;