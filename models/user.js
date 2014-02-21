var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require("bcrypt-nodejs"),
    SALT_WORK_FACTOR = 10;

var UserSchema =  new Schema({
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		},
	password: {
		type: String,
		required: true
	}
	email: {
		type: String,
		required: true
	}

}
		});
