//vars declared and defined. 
var url = require("url");
var util = require("util");
var mongoose = require("mongoose");
var express = require("express");
var ejs = require("ejs");

//mongo connection TODO hardcoded now should be user configurable from front end.
var db = mongoose.connect('mongodb://127.0.0.1/local');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
		res.render('login_page.html');	
	});


console.log("Server started at port 8888");
app.listen(8888);


