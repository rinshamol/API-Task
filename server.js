var express=require('express');
var app=express();

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}));

var mongoose=require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/mdb');
var student=require('./models/student.js');

app.get('/show',function(req,res){
    student.find(function(err,response){
      res.send(response);
    });
});

/* app.post('/',function(req,res){
    res.send(req.body);
}); */


app.post('/',function(req,res){
    var info = req.body;
    if(!info.name || !info.age || !info.place){
        res.send("ERROR");
    }else{
        var stud =new student({
            name:info.name,
            age:info.age,
            place:info.place
        });
        stud.save(function(err,response){
            if(err)
                res.send("ERROR!");
            else
               res.send("Success");
        });
    }
});
app.listen(3080);