var express=require('express');
var mongodb=require('mongodb');

var app=new express();
app.use(express.static('css'))
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
let bodypasrer=require('body-parser');
let morgan =require('morgan');
var mongoose=require('mongoose');
var task=require('./models/task');
var developer=require('./models/developer');
mongoose.connect("mongodb://localhost:27017/storeDB");

let url="mongodb://localhost:27017/storeDB";

mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology:true },
    function (err) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            
        }
    });
    app.use (bodypasrer.urlencoded({extended:false}));
    app.use(bodypasrer.json());
    
app.use(express.static('img'));
var filepath=__dirname+"/views/";
app.get("/",function(req,res){
    let fileName=filepath+"inde.html";
    res.sendFile(fileName);
});
app.get("/addTask",function(req,res){
    let fileName=filepath+"inserttask.html";
    res.sendFile(fileName);
    

});


app.post("/regidev",function(req,res){
    let userDetails = req.body;
    var dev1=new developer({
       'Name.FirstName':userDetails.fname,
       'Name.LastName':userDetails.lname,
       'Level':userDetails.level.toUpperCase(),
       'Address.State':userDetails.state,
       'Address.Suburb':userDetails.suburb,
       'Address.Street':userDetails.street,
       'Address.Unit':userDetails.unit
    })
    
    dev1.save();

    // developer.create({
        
    // })

     res.redirect('/listdev'); 

});
app.get("/listdev",function(req,res){
    developer.find((function (err, data) {
        res.render('listdev', { mycustomers: data });
   

})

)});
app.get("/list",function(req,res){
    task.find((function (err, data) {
        res.render('list', { mycustomers: data });
   

})

)});

app.get("/addDev",function(req,res){
    let fileName=filepath+"insertdev.html";
    res.sendFile(fileName);
    

});
app.post("/deletebyid",function(req,res){
    let i = new mongodb.ObjectID(req.body.id)
    
    task.deleteOne({ _id:i}, function (err, obj) {
        console.log(obj.result);
      });
      res.redirect('/list'); 


});
app.get("/deletecomplete",function(req,res){


    task.deleteMany({TaskStatus:"completed"} , function (err, obj) {
        console.log(obj.result);
      });
      res.redirect('/list'); 
});

app.get("/:old/:new",function(req,res){
    developer.updateMany({ 'Name.FirstName':req.params.old }, { $set: {  'Name.FirstName':req.params.new} }, function (err, doc) {
        console.log(doc);
    });
    res.redirect ('/listdev'); 


})



app.post("/up",function(req,res){
    console.log(req.body.id)
    let i = new mongodb.ObjectID(req.body.id)
    
  
      task.updateOne({ _id:i}, { $set: {TaskStatus:req.body.status}} , function (err, doc) {
          console.log(doc);
    });

    res.redirect('/list');
});

app.post("/regi",function(req,res){
    let userDetails = req.body;
    var task1=new task(
        {
            'TaskName':userDetails.name,
            'AssignTo':new mongoose.Types.ObjectId(userDetails.dev),
            'DueDate':new Date(userDetails.date),
            'TaskStatus':userDetails.status,
            'TaskDescription':userDetails.Descrip,

        }
      
    )
    task1.save();
    res.redirect('/list'); 

});

 
app.listen(8080);
