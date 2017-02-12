var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

app.get('/test', function(req, res){
  console.log("In method test " + process.argv[2]);
  res.end("hurray!! send_flowers is working")
});
var server = app.listen(process.argv[2])