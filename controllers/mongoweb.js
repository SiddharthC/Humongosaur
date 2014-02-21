var User = require("../models/user.js");

var MongoWebController = {


	loginPage : function(req, res) {
		res.sendfile("login.html", {root: "./views/"});
		req.session.lastPage = '/login';
	},

	login : function(req, res) {
		var username = req.param("username", "");
		var password = req.param("password", "");
		User.findOne({username: username}, function(err, user) {
			if (err) {
				throw err;
			}
			if (user) {
				user.comparePassword(password, function(err, isMatch) {
					if (err) {
						throw err;
					}
					if (isMatch) { //check if password match
						req.session.username = username; //set session username for the session. Used for authentication.
						req.session.isAdminFlag = user.isAdminFlag;
						res.redirect('/home');
					} 
					else {
						res.redirect('/login');
					}
				});
			} 
			else {
				res.redirect('/login');
			}
		});
	},
	
	logout: function(req, res){
		req.session.destroy();
		res.status(302).redirect("/login");
	},
};

module.exports = MongoWebController;
