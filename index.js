//required .env file's variables
require('dotenv').config();

//require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');

//declare app variable
var app = express();

//set and use statments
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public/'));

//custom middleware - FUN!
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

//add controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/articles', require('./controllers/articles'));
app.use('/comments', require('./controllers/comments'));

//define routes
app.get('/', function(req, res){
	res.render('home');
});

app.get('/random', function(req, res){
	res.render('random');
});

app.get('*', function(req, res){
	console.log('wildcard route');
	res.render('error');
});

//listen to port 3000
app.listen(process.env.PORT || 3000);