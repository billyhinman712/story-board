//require needed modules
var async = require('async');
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');

//include models
var db = require('../models');

//declare a new route
var router = express.Router();

router.get('/', function(req, res){
	db.article.findAll().then(function(allStories){
		db.user.findAll().then(function(allUsers){
			res.render('stories/list', {stories: allStories, users: allUsers});
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
	}).then(function(foundStory){
		db.user.findAll().then(function(allUsers){
			res.render('Stories/show', {story: foundStory, users: allUsers});
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
	}).then(function(foundStory){
		db.user.findAll().then(function(allUsers){
			res.render('stories/edit', {story: foundStory, users: allUsers});
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
				async.forEach(tags, function(t, done){
					//this code runs for each individual tag we add
					db.tag.findOrCreate({
						where: {name: t.trim()}
					}).spread(function(newTag, wasCreated){
						createdStory.addTag(newTag).then(function(){;
							done();//tells async, function iteration is done
						});
					});
				}, function(){
					//this code runs when forEach is done
					res.redirect('/stories/' + createdStory.id);
				});
			}else{
			res.redirect('/stories/' + createdStory.id);
		}
		}).catch(function(err){
			console.log(err);
			res.render('error');
		});
	}else{
		res.redirect('/stories/new');
	};
});

router.put('/', function(req, res){
	res.send(req.body);
});

router.delete('/:id', function(req, res){
	console.log(req.params.id);
	db.article.findOne({
		where: {id: req.params.id},
		include: [db.comment]
	}).then(function(foundArticle){
		console.log("FOUND Story:", foundStory);
		async.forEach(foundStory.tags, function(a, done){
			foundStory.removeTag(a).then(function(){
				done();
			});
		}, function(){
			db.article.destroy({
				where: {id: req.params.id}
			}).then(function(){
				res.send('success');
			}).catch(function(err){
				console.log(">>>>>>>FAILING IN Story DESTROY catch")
				res.status(500).send('oh noo!');
			});
		});
	}).catch(function(err){
		console.log("!!!!!!!FAILING IN Story findone catch")
		res.status(500).send('oh noo!');
	});
})

module.exports = router;