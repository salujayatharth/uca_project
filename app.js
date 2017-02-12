var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config.json');
var mongoose = require('mongoose')
var utils = require('./utils')
var app = express();

app.use(bodyParser.json());
app.use(express.static('static'));

mongoose.connect(config.connectionString)
var PORT = process.argv[2] || 9090

app.get('/test', function(req, res){
    utils.log(arguments[0].route)
    res.end("hurray!! send_flowers is working")

});
var server = app.listen(PORT)