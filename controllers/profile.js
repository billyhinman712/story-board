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

router.get('/', function(req, res){
	res.send('shows users stories');
});

router.get('/articles', function(req, res){
	db.article.findAll().then(function(allArticles){
		db.user.findAll().then(function(allUsers){
			res.render('profile/list', {articles: allArticles, users: allUsers});
		});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});

module.exports = router;