var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ams",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

var sIdlogedIn=null;
app.get("/",function(req,res){
    res.render("index");
});

var facultySchema = new mongoose.Schema({
    id : String,
    password : String,
    name : String,
    code : Array
});
var faculty = new mongoose.model("faculty",facultySchema);

var studentSchema = new mongoose.Schema({
    id: String,
    password: String,
    name: String,
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
    res.render("attendance",{name:fac.name,id:fac.id,code:req.params.code,courses:facultyCourses,list:list});
});
app.post("/attendance/:code",async (req,res)=>{
    var c= await courseFind({code:req.params.code});
    c.schedule.push(req.body.date);
    c.idStudent = c.idStudent.sort();
    await courseUpdate(c._id,c);    
    console.log(c.idStudent);
    for(let i=0;i<c.idStudent.length;i++){
        var id=c.idStudent[i];
        var st=await studentFind({id:id});
        if(req.body.attendance[i]=='Present'){
            for(let j=0;j<st.course.length;j++)
            {
                if(st.course[j].code==req.params.code){
                    st.course[j].attendance.push('p');
                    break;
                }
            }
        }
        else{
            for(let j=0;j<st.course.length;j++)
            {
                if(st.course[j].code==req.params.code){
                    st.course[j].attendance.push('');
                    break;
                }
            }
        }
        await studentUpdate(st._id,st);    
    }
    console.log(req.body);
    var facultyCourses=[];
    var attendances=[];
    var fac= await facultyFind({id:req.body.fCode});
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
    pageRenderingData={courses:facultyCourses,name:fac.name,attendances:attendances};
    res.redirect("/faculty");
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


function studentUpdate(id,newObj){
    return new Promise(function(resolve,reject){
        student.findByIdAndUpdate(id,newObj,function(err,obj){
            if(err)
                console.log(err)
            else{
                console.log("Data Updated");
                resolve(true);

            }
        });
    });
}
function courseUpdate(id,newObj){
    return new Promise(function(resolve,reject){
        course.findByIdAndUpdate(id,newObj,function(err,obj){
            if(err)
                console.log(err)
            else{
                console.log("Data Updated");
                resolve(true);

            }
        });
    });
}
function facultyUpdate(id,newObj){
    return new Promise(function(resolve,reject){
        faculty.findByIdAndUpdate(id,newObj,function(err,obj){
            if(err)
                console.log(err)
            else{
                console.log("Data Updated");
                resolve(true);
            }
        });
    });
} 

app.get("/student",async (req,res)=>{
    var st= await studentFind({id:sIdlogedIn});
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

app.get("/logout",(req,res)=>{
    logedIn=null;
    sIdlogedIn=null;
    res.redirect("/");
});

app.post("/faculty",async (req,res)=>{
    var fac= await facultyFind({id:req.body.user,password:req.body.pass});
    if(fac!=undefined)
    {   
        var facultyCourses=[];
        var attendances=[];
        for(let i=0;i<fac.code.length;i++){
            var attend = [];
            var find = await courseFind({code:fac.code[i]});
            find.idStudent=find.idStudent.sort();
            facultyCourses.push(find);
            for(let j=0;j<find.idStudent.length;j++){
                var st = await studentFind({id:find.idStudent[j]});
                var attendanceObj =await st.course.find(async function(c) {
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
    }
    var st= await studentFind({id:req.body.user,password:req.body.pass});
    if(st!=undefined)
    {   sIdlogedIn=st.id;
        res.redirect("/student");
    }
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server is started on port 3000");
});