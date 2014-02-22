var User = require("../models/user.js");
var mongoose = require("mongoose");
var childProcess = require("child_process");
var Query = require("../models/queryModel.js");

//create connection

var MongoWebController = {
	
	configure: function(){	//admin account init check
		User.findOne({username: "admin"}, function(err, result){
			if (err){
				throw err;
			}
			if (!result){
				new User({
					username: "admin",
					password: "adminadmin",
					email: "admin@domain.com",
					isAdminFlag: "true"
				}).save(function(err, result){
					if(err){
								
					}
				});
			}
		});
	},

	helper : {
		authenticate : function(req, res, next) {
			var isAuthenticated = false;
			if (req.session.username) {
				isAuthenticated = true;
			}
			if (isAuthenticated) {
				next();
			} 
			else {
				console.log("Authentication error");
				res.redirect('/login');
			}
		},			      
		authenticateAdmin : function(req, res, next) {
			var isAuthenticated = false;
			if (req.session.username && req.session.isAdminFlag === true)
				isAuthenticated = true;
			if (isAuthenticated)
				next();
			else {
				console.log("Admin verification failed");
				res.redirect('/login');
			}
		}
	},

	loginPage: function(req, res) {
		res.sendfile("login_page.html", {root: "./views/"});
		req.session.lastPage = '/login';
	},

	login: function(req, res) {
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

	home: function(req, res, next){
		res.sendfile("home.html", {root: "./views/"});
	},
	
	//write query post function
	inputQuery: function(req, res){
		//TODO
		//test code start
		var query = "db.zips.find()";
		var commandString = "mongo mongoweb --eval \"printjson( "+ query + " )\""; 
		
		childProcess.exec(commandString, function(err, stdout, stderr){
			if(err){
				console.log(err.stack);
				console.log("Error code: " + err.code);
				console.log("Signal received: " + err.signal);
			}

			console.log("stdout: " + stdout);
		});
		//end
	},

	registerPage: function(req, res){
		res.sendfile("register.html", {root: "./views/"});
		req.session.lastPage = '/login';
	},
	
	register: function(req, res, next){
		var username = req.param("username", "");
		var password = req.param("password", "");
		var email = req.param("email", "");
		var isAdminFlag = req.param("isAdminFlag", "");

		if (username == 'Username'){
			res.send("Please input a valid username");
			return;
		}

		if (username = 'mail@address.com'){
			res.send("Please input a valid email address");
			return;
		}

		if (isAdminFlag === ""){
			isAdminFlag = false;
		}

		User.findOne({
			email: email
		}, function(err, result){
			if (err){
				throw err;
			}

			if (result){
				res.send("This email id  is already registered...\nPlease use Reset Form for password recovery.");
			}
			else{
				new User({
					username: username,
					password: password,
					email: email,
					isAdminFlag: isAdminFlag
				}).save(function(err, result){
					if(err){
						throw err;
					}

					/*
					var mailOptions = {
						from: "MongoWeb Dev Team <mongoweb.node@gmail.com>",
						to: email,
						subject: "Hello World",
						text: "Hello world",
						html: "<b>Hello world.</b>"
					};

					var smtpTransport = nodemailer.createTransport("SMTP", {
						service: "Gmail",
						auth: {
							user: "mongoweb.node@gmail.com",
							pass: ""
						}
					});

					smtpTransport.sendMail(mailOptions, function(error, response){
						if(error){
							console.log("Invalid Email: "+error);
							res.redirect('/register');
						}
					});

					res.send("Please verify through the email received.");
					*/

					res.send("Thanks for registering....");
				});
			}
		});
	}
};

module.exports = MongoWebController;
