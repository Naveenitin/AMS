var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    id: String,
    password: String,
    name: String,
    course: Array
});

module.exports = mongoose.model("student",studentSchema);