var mongoose = require("mongoose");
var facultySchema = new mongoose.Schema({
    id : String,
    password : String,
    name : String,
    code : Array
});
module.exports = mongoose.model("faculty",facultySchema);