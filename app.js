var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Welcom to Home Page");
});



app.listen(3000,()=>{
    console.log("Server is started on port 3000");
});