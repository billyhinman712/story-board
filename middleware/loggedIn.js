module.exports = function(req, res, next){
	if(!req.user){
		req.flash('error', 'You gotta be logged in to look at this page');
		res.redirect('/auth/login');
	}
	else {
		next();
	}
}