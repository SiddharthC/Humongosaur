var express =  require("express");
var mongoStore =  require("connect-mongo")(express);
var MongoWebController =  require("../controllers/mongoweb.js");

module.exports = function(app, config){
	app.configure(MongoWebController.configure);
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.static(config.ROOT_PATH + "/views"));
	app.use(express.cookieParser());

	app.use(express.session({
		secret: "mongoweb-session-key-cs4400x",
		store: new mongoStore({
			url: config.DATABASE_URL,
			collection: "mongoweb_sesions"})
				}));
	
	app.use(express.logger());
	app.use(app.router);
};
