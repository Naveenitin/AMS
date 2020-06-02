var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    code : Number,
    name : String,
    schedule : Array,
    idStudent : Array

});

module.exports = mongoose.model("course",courseSchema);