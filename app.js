var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ams",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

var facultySchema = new mongoose.Schema({
    id : Number,
    password : Number,
    name : String,
    code : Array
});
var faculty = new mongoose.model("faculty",facultySchema);

var studentSchema = new mongoose.Schema({
    id:Number,
    name:String,
    course: Array
});
var student = mongoose.model("student",studentSchema);

var courseSchema = new mongoose.Schema({
    code : Number,
    name : String,
    schedule : Array,
    idStudent : Array

});
var course = mongoose.model("course",courseSchema);
var pageRenderingData=null;
var logedIn=null;

app.get("/faculty",(req,res)=>{
    res.render("faculty",pageRenderingData);
});

app.get("/attendance/:code",async (req,res)=>{
    var facultyCourses=[];
    var list=[];
    var fac= await facultyFind({id:logedIn});
    for(let i=0;i<fac.code.length;i++){
        var find = await courseFind({code:fac.code[i]});
        find.idStudent=find.idStudent.sort();
        facultyCourses.push(find);        
    }
    var c= await courseFind({code:req.params.code});
    var sts=c.idStudent.sort();
    for(let i=0;i<sts.length;i++){
        var st = await studentFind({id:sts[i]});
        list.push({
            id:st.id,
            name:st.name  
        });
    }
    res.render("attendance",{name:fac.name,code:req.params.code,courses:facultyCourses,list:list});
});
app.post("/attendance/:code",async (req,res)=>{
    console.log(req.body);
    res.send(req.params);
});

function studentFind(query){
    return new Promise(function(resolve,reject){
        student.findOne(query,function(err,obj){
            if(err)
                console.log(err)
            else{
                resolve(obj);
            }
        });
    });
}
function courseFind(query){
    return new Promise(function(resolve,reject){
        course.findOne(query,function(err,obj){
            if(err)
                console.log(err)
            else{
                resolve(obj);
            }
        });
    });
}
function facultyFind(query){
    return new Promise(function(resolve,reject){
        faculty.findOne(query,function(err,obj){
            if(err)
                console.log(err)
            else{
                resolve(obj);
            }
        });
    });
} 


app.get("/student",async (req,res)=>{
    var st= await studentFind({id:201852022});
    var data=[];
    for(let i=0;i<st.course.length;i++){
        var obj=await courseFind({code:st.course[i].code});
        data.push({
            code:obj.code,
            name:obj.name,
            schedule:obj.schedule
        });
    }
    res.render("student",{student:st,data:data});
});

app.post("/faculty",async (req,res)=>{
    var facultyCourses=[];
    var attendances=[];
    var fac= await facultyFind({id:req.body.user,password:req.body.pass});
    for(let i=0;i<fac.code.length;i++){
        var attend = [];
        var find = await courseFind({code:fac.code[i]});
        find.idStudent=find.idStudent.sort();
        facultyCourses.push(find);
        for(let j=0;j<find.idStudent.length;j++){
            var st = await studentFind({id:find.idStudent[j]});
            var attendanceObj = st.course.find(function(c) {
                if(c.code == fac.code[i])
                    return true;
            });

            attend.push({
                id:st.id,
                name:st.name,
                attendance:attendanceObj.attendance
            });
        }
        attendances.push(attend);
    }
    logedIn=req.body.user;
    pageRenderingData={courses:facultyCourses,name:fac.name,attendances:attendances};
    res.redirect("/faculty")

});

app.listen(3000,()=>{
    console.log("Server is started on port 3000");
});