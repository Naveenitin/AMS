var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});


var courses=[
    {code:100,name:"Physics"},
    {code:101,name:"Math"},
    {code:102,name:"Chemistry"},
    {code:103,name:"Oilochem"}
];
var attendance=[
    {id:201852022,name:"Naveen",date:"22:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"24:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"25:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"27:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"26:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"21:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"20:5:19",a:"p"},
    {id:201852022,name:"Naveen",date:"2:5:19",a:"p"}
];

app.get("/faculty",(req,res)=>{
    res.render("faculty",{courses:courses,attendance:attendance});

});

app.post("/faculty",(req,res)=>{
    attendance=[
        {id:201852019,name:"Naveen",date:"22:5:19",a:"p"},
        {id:201852019,name:"Naveen",date:"24:5:19",a:"p"},
        {id:201852019,name:"Naveen",date:"25:5:19",a:"p"},
        {id:201852019,name:"Naveen",date:"27:5:19",a:"p"}
    ];
    res.redirect("/faculty");
});

app.listen(3000,()=>{
    console.log("Server is started on port 3000");
});