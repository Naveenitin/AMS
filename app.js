var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

var pageRenderingData=null;
var faculty=[
    {
        id:1,
        password:1,   
        name:"Dr. Naveen Kumar",
        code:[101,210]
    },
    {
        id:2,
        password:2,
        name:"Ajay Nath",
        code:[100,101]
    }
];
var students=[
    {
        id:201852022,
        name:"Naveen Gaur",
        course:[
            {
                code:100,
                attendance:[
                    "p","","","","","","",""
                ]
            },
            {
                code:101,
                attendance:[
                    "","p","","","","p","","p"
                ]
            }
        ]
    },
    {
        id:201852019,
        name:"Mansi Gupta",
        course:[
            {
                code:100,
                attendance:[
                    "","p","","","","p","","p"
                ]
            },
            {
                code:210,
                attendance:[
                    "p","","p","","","p","",""
                ]
            }
        ]
    },
    {
        id:201852008,
        name:"Faizan",
        course:[
            {
                code:210,
                attendance:[
                    "","","p","","","","p",""
                ]
            }
        ]
    },
    {
        id:201852005,
        name:"AP",
        course:[
            {
                code:100,
                attendance:[
                    "","p","","","p","","",""
                ]
            },
            {
                code:101,
                attendance:[
                    "","p","","","p","","",""
                ]
            },
            {
                code:210,
                attendance:[
                    "p","","p","","","","","p"
                ]
            }
        ]
    },
    {
        id:201852023,
        name:"Het Patel",
        course:[
            {
                code:100,
                attendance:[
                    "p","p","p","p","p","p","p","p"
                ]
            },
            {
                code:101,
                attendance:[
                    "","","","","","","",""
                ]
            },
            {
                code:210,
                attendance:[
                    "","p","","p","p","","p",""
                ]
            }
        ]
    },
    {
        id:201852024,
        name:"Prachi Desai",
        course:[
            {
                code:100,
                attendance:[
                    "p","","p","","p","","","p"
                ]
            },
            {
                code:101,
                attendance:[
                    "","p","","","","p","","p"
                ]
            },
            {
                code:210,
                attendance:[
                    "p","","","p","","","p",""
                ]
            }
        ]
    }
];
var courses=[
    {
        code:100,
        name:"Physics",
        schedule:[
            "30:4:19","2:5:19","20:5:19","21:5:19","22:5:19","24:5:19","25:5:19","27:5:19"
        ],
        idStudent:[
            201852022,201852019,201852005,201852023,201852024
        ]
    },
    {
        code:101,
        name:"Maths",
        schedule:[
            "2:5:19","20:5:19","21:5:19","22:5:19","24:5:19","25:5:19","27:5:19","1:6:19"
        ],
        idStudent:[
            201852022,201852005,201852023,201852024
        ]
    },
    {
        code:210,
        name:"AI and ML",
        schedule:[
            "2:5:19","20:5:19","21:5:19","22:5:19","24:5:19","25:5:19","27:5:19"
        ],
        idStudent:[
            201852019,201852008,201852005,201852023,201852024
        ]
    }

];


app.get("/faculty",(req,res)=>{
    if(pageRenderingData!=null)
        res.render("faculty",pageRenderingData);
    else
        res.redirect("/");
    pageRenderingData=null;
});

app.post("/faculty",(req,res)=>{
    var facultyCourses=[];
    var attendances=[];
    faculty.forEach(i => {
        if(i.id==req.body.user && i.password==req.body.pass){
            i.code.forEach(code => {
                var attend=[];
                var find = courses.find(function(course) {
                    if(course.code == code)
                        return true;
                });
                find.idStudent=find.idStudent.sort();                
                facultyCourses.push(find);
                find.idStudent.forEach(id => {
                    var student = students.find(function(s) {
                        if(s.id == id)
                            return true;
                    });
                    var attendanceObj = student.course.find(function(c) {
                        if(c.code == find.code)
                            return true;
                    });

                    attend.push({
                        id:student.id,
                        name:student.name,
                        attendance:attendanceObj.attendance                        
                    });

                });
                attendances.push(attend);

            });
            
            pageRenderingData={courses:facultyCourses,name:i.name,attendances:attendances};
            res.redirect("/faculty")
        }

    });
    
});

app.listen(3000,()=>{
    console.log("Server is started on port 3000");
});