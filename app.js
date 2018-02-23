var express = require('express');
var mongoose= require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const port = 3000;

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/contactlist')

mongoose.connection.on('connected',function(){
    console.log("connected to database mongodb@27017")
})

mongoose.connection.on('error',function(err){
    if(err){
        console.log("error");
    }
})
app.use(cors());
app.use(bodyparser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',route);

app.get('/',function(req,res){
    res.send("hello")
})

app.listen(port,function(){
    console.log("server started at port"+port);
})