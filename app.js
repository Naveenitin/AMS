var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});



var data=[
    {
        code:100,
        name:"Physics",
        attendance:[
            {id:201852022,name:"Narayan",date:"22:5:19",a:"p"},
            {id:201852022,name:"Nova",date:"24:5:19",a:"p"},
            {id:201852022,name:"Nadeen",date:"25:5:19",a:"p"},
            {id:201852022,name:"Nxt",date:"27:5:19",a:"p"},
            {id:201852022,name:"Naveen",date:"21:5:19",a:"p"},
        ]
    },
    {
        code:101,
        name:"Math",
        attendance:[
            {id:201852022,name:"Nexsus",date:"20:5:19",a:"p"},
            {id:201852022,name:"Naveen",date:"2:5:19",a:"p"},
            {id:201852022,name:"Nova",date:"24:5:19",a:"p"}
        ]
    },
    {
        code:210,
        name:"AI and Boom",
        attendance:[
            {id:201852022,name:"Nxt",date:"20:5:19",a:"p"},
            {id:201852022,name:"Novas",date:"24:5:19",a:"p"},
            {id:201852022,name:"Naveen",date:"2:5:19",a:"p"}
        ]
    }
];

app.get("/faculty",(req,res)=>{
    res.render("faculty",{data:data});

});


app.listen(3000,()=>{
    console.log("Server is started on port 3000");
});