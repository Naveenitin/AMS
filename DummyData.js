// This is used for insert dummy data into database.
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ams",{useNewUrlParser: true, useUnifiedTopology: true});

//  external modules
var faculty = require("./modules/faculty");
var student = require("./modules/student");
var course = require("./modules/course");

faculty.create([
    {
        id:"1",
        password:"1",   
        name:"Dr. Naveen Kumar",
        code:[101,210]
    },
    {
        id:"2",
        password:"2",
        name:"Ajay Nath",
        code:[100,101]
    }
]); 

student.create([
    {
        id:"201852022",
        password:"201852022",
        name:"Naveen Gaur",
        course:[
            {
                code:100,
                attendance:[
                ]
            },
            {
                code:101,
                attendance:[
                ]
            }
        ]
    },
    {
        id:"201852019",
        password:"201852019",
        name:"Mansi Gupta",
        course:[
            {
                code:100,
                attendance:[
                ]
            },
            {
                code:210,
                attendance:[
                ]
            }
        ]
    },
    {
        id:"201852008",
        password:"201852008",
        name:"Faizan",
        course:[
            {
                code:210,
                attendance:[
                ]
            }
        ]
    },
    {
        id:"201852005",
        password:"201852005",
        name:"AP",
        course:[
            {
                code:100,
                attendance:[
                ]
            },
            {
                code:101,
                attendance:[
                ]
            },
            {
                code:210,
                attendance:[
                ]
            }
        ]
    },
    {
        id:"201852023",
        password:"201852023",
        name:"Het Patel",
        course:[
            {
                code:100,
                attendance:[
                ]
            },
            {
                code:101,
                attendance:[
                ]
            },
            {
                code:210,
                attendance:[
                ]
            }
        ]
    },
    {
        id:"201852024",
        password:"201852024",
        name:"Prachi Desai",
        course:[
            {
                code:100,
                attendance:[
                ]
            },
            {
                code:101,
                attendance:[
                ]
            },
            {
                code:210,
                attendance:[
                ]
            }
        ]
    }
]);


course.create([
    {
        code:100,
        name:"Physics",
        schedule:[
        ],
        idStudent:[
            201852022,201852019,201852005,201852023,201852024
        ]
    },
    {
        code:101,
        name:"Maths",
        schedule:[
        ],
        idStudent:[
            201852022,201852005,201852023,201852024
        ]
    },
    {
        code:210,
        name:"AI and ML",
        schedule:[
        ],
        idStudent:[
            201852019,201852008,201852005,201852023,201852024
        ]
    }

]);

console.log("done");
