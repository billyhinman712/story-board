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
	db.article.findOne({
		where: {id: req.params.id},
		include: [db.user, db.comment, db.tag]
	}).then(function(foundArticle){
		db.user.findAll().then(function(allUsers){
			res.render('articles/show', {article: foundArticle, users: allUsers});
		}).catch(function(err){
			console.log(err);
			res.render('error');
		});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});

router.get('/:id/edit', function(req, res){
	db.article.findOne({
		where: {id: req.params.id},
	}).then(function(foundArticle){
		db.user.findAll().then(function(allUsers){
			res.render('articles/edit', {article: foundArticle, users: allUsers});
		}).catch(function(err){
			console.log(err);
			res.render('error');
		});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});

router.post('/', function(req, res){
	console.log('BDY', req.body);
	db.article.create(req.body).then(function(createdArticle){
		res.redirect('/articles');
	}).catch(function(err){
		console.log('errrrrr', err)
		res.render('error');
	});
});

module.exports = router;