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
	if(req.body.userId !== 0){
		console.log(req.body);
		db.article.create(req.body).then(function(createdArticle){
			//parse the tags if any
			var tags = [];
			if(req.body.tag){
				tags = req.body.tag.split(',');
			}

			if(tags.length > 0){
				async.forEach(tag, function(t, done){
					//this code runs for each individual tag we add
					db.tag.findOrCreate({
						where: {name: t.trim()}
					}).spread(function(newTag, wasCreated){
						createdArticle.addTag(newTag).then(function(){;
							done();//tells async, function iteration is done
						});
					});
				}, function(){
					//this code runs when forEach is done
					res.redirect('/articles/' + createdArticle.id);
				});
			}else{
			res.redirect('/articles/' + createdArticle.id);
		}
		}).catch(function(err){
			console.log(err);
			res.render('error');
		});
	}else{
		res.redirect('/articles/new');
	};
});

router.put('/', function(req, res){
	res.send(req.body);
});

router.delete('/:id', function(req, res){
	db.article.findOne({
		where: {id: req.params.id},
		include: [db.comment]
	}).then(function(foundArticle){
		async.forEach(foundArticle.tags, function(a, done){
			foundArticle.removeTag(a).then(function(){
				done();
			});
		}, function(){
			db.article.destroy({
				where: {id: req.params.id}
			}).then(function(){
				res.send('success');
			}).catch(function(err){
				res.status(500).send('oh noo!');
			});
		});
	}).catch(function(err){
		res.status(500).send('oh noo!');
	});
})

module.exports = router;