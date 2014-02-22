var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var queryString = new Schema({any: Schema.Types.Mixed});

module.exports = mongoose.model("queryString", queryString);
