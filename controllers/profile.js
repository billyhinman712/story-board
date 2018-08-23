//require needed modules
var express = require('express');

//declare a new route
var router = express.Router();

//define routes
router.get('/', function(req, res){
	res.render('auth/profile/index');
});

module.exports = router;