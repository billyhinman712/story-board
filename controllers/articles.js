//require needed modules
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');

//include models
var db = require('../models');

//declare a new route
var router = express.Router();

router.get('/', function(req, res){
	db.article.findAll().then(function(allArticles){
		db.user.findAll().then(function(allUsers){
			res.render('articles/list', {articles: allArticles, users: allUsers});
		});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});

router.get('/new', function(req, res){
	console.log(req.url);
	db.user.findAll().then(function(allUsers){
		res.render('articles/new', {users: allUsers});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});

router.get('/:id', function(req, res){
	res.send('artile id page');
});

router.post('/', function(req, res){
	res.send('post route for articles');
});

module.exports = router;