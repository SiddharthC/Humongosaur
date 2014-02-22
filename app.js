//vars declared and defined. 
var mongoose = require("mongoose");
var express = require("express");
var config = require("./config/config.js");
var MongoWebController = require("./controllers/mongoweb.js");
var _ = require("underscore");

var app = express();

//mongo connection TODO hardcoded now should be user configurable from front end.
var db = mongoose.connect(config.DATABASE_URL);

/*Bootstrap express*/
require("./config/express.js")(app, config);

app.get('/', function(req, res){
		res.redirect("login");
	});

//Serving pages
app.get("/login", MongoWebController.loginPage);
app.get("/register", MongoWebController.helper.authenticateAdmin, MongoWebController.registerPage);
app.get("/home", MongoWebController.helper.authenticate, MongoWebController.home);

//Posts
app.post("/login", MongoWebController.login);
app.post("/logout", MongoWebController.logout);
app.post("/register", MongoWebController.helper.authenticateAdmin, MongoWebController.register);
app.post("/inputQuery", MongoWebController.authenticate, MongoWebController.inputQuery);

app.listen(config.SERVER_PORT);
console.log("MongoWeb server up and running at --> " + config.SERVER_PORT);

