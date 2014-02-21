var path = require("path");

module.exports = {
	SERVER_PORT: 8888,
	DATABASE_URL: "mongodb://localhost/mongoweb",

	ROOT_PATH: path.normalize(__dirname + "/..")
};
