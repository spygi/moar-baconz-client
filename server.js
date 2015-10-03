var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./router');


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/moarbaconz');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); 

app.use('/api', router);
app.use('/status', function(req, res){
    var data = { status: "running", version: "1.0.0" };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
})

app.listen(process.env.PORT || 3000);