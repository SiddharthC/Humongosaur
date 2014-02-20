var path = require("path");

module.export = {
	SERVER_PORT: 8888,
	DATABASE_URL: "mongodb://localhost/local",

	ROOT_PATH: path.normalize(__dirname + "/..")
};
