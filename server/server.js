const express = require('express');
const app = express();
require('dotenv').config()
const path = require('path');
const mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    console.log("database created");
    var dbo=db.db("mydb");
    // dbo.createCollection("products",function(err,res){
    // if(err) throw err;
    // console.log("collection created");
    // db.close();


    // })
    // var myobj={name: "iphone 7 plus",price:900};
    // dbo.collection("products").insertOne(myobj,function(err,res){
    //     if(err) throw err;
    // console.log("1 document inserted");
    // db.close();
    // });

    // dbo.collection("products").find({}).toArray(function(err,result){
    //     if(err) throw err;
    //    console.log("result with find all method");
    //    console.log(result);
    //    db.close();
    // });

    // dbo.collection("products").find({},{projection:{_id:0,name:1}}).toArray(function(err,result){
    //     if(err) throw err;
    //    console.log("choose what properties need to display");
    //    console.log(result);
    //    db.close();
    // });


    // dbo.collection("products").findOne({},function(err,result){
    //     if(err) throw err;
    //     console.log("result with find one method");
    //     console.log(result);
    //     db.close();
    // });



   
});


var mongoose = require('mongoose'); 
mongoose.connect("mongodb://localhost:27017/mynewdata",{ useCreateIndex: true, useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function() {
  console.log("we're connected using mongoose....");
});

//define a schema
// var Schema =mongoose.Schema
// var UserSchema=new Schema({
//     first_name:String,
//     last_name:String,
//     age: Number,
//     email:String
// })
// const UserModel=mongoose.model('User',UserSchema);

// //mongoose insert document
// var newUser=new UserModel({
//     first_name:'John',
//     last_name:'Nguyen',
//     age:18,
//     email: 'nphat3536@gmail.com'
// })

// newUser.save(function(err,result){
//     if(err) throw err;
//     console.log('1 document inserted');
//     console.log(result);
// })

var Schema=mongoose.Schema;
var mongoose = require('mongoose');
var CourseCategorySchema=new Schema({
    name:{
        type: String,
        unique: true,
        required: 'please',
        maxlength: 500
        
    },
    description:{
        type: String,
        trim: true 
    },
    course_category_parent_id:{
        type: Schema.Types.ObjectId,
        ref:'CourseCategory'
    },
    status:{
        type:Number,
        default:0
    }
})

var CourseCategoryModel=mongoose.model('CourseCategory',CourseCategorySchema);




const port=process.env.PORT || 3004;

app.get('/',function(req,res){
    res.send('hello world change 2');

});

app.get('/api/course_categories', function(req,res){
    //do nothing here at this time
    CourseCategoryModel.find({})
        .populate({path:'course_category_parent_id',select:'name'})
        .exec(function(err,results){
            let newResults=results.map(item=>{
                return{
                    _id:item.id,
                    name:item.name,
                    description:item.description,
                    course_category_parent_id:item.course_category_parent_id==null?'':item.course_category_parent_id._id,
                    course_category_parent_name:item.course_category_parent_id==null?'':item.course_category_parent_id.name,
                    status: item.status
                }
            })
            res.json(newResults);

        })
  
});
app.post('/api/course_categories', function(req,res){
    //do nothing here at this time
});
app.put('/api/course_categories/:id', function(req,res){
    //do nothing here at this time
});
app.delete('/api/course_categories:id', function(req,res){
    //do nothing here at this time
});

// define api server
app.listen(port,()=>{
// call a callback function
console.log('server is running at port '+port);

})
// nodemon: save time for process
// 