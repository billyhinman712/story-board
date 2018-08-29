//require needed modules
var express = require('express');

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
	res.send('my articles page');
});

module.exports = router;