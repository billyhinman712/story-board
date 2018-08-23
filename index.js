//require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var passport = require('./config/passportConfig');
var session = require('express-session');

//declare app variable
var app = express();

//set and use statments
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(session({
	secret: 'abc',
	resave: false,
	saveUninitailized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//add controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));

//define routes
app.get('/', function(req, res){
	res.render('home');
});

//listen to port 3000
app.listen(3000);