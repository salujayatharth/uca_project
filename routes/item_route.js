var express = require('express')
var router = express.Router()
var utils = require('../utils')
var Cart = require('../models/Cart');
var User = require('../models/User');
var Item = require('../models/Items');
var storage = require('../config.json').photoStore;

router.use(function(req,res,next) {
  next();
})

//displays all items
router.get('/', function(req,res,next){
  Item.getAll(function(result){
    res.json(result)
  })
});

router.get('/addReview',utils.isLoggedIn,  function(req, res){
  Item.addReview(req.query.id,req.query.review,function(result){
    res.json(result);
  })
});

router.get('/getReview', function(req, res){
  Item.getReview(req.query.id,function(result){
    res.json(result);
  })
});

router.get('/addRating',utils.isLoggedIn, function(req, res){
  Item.addRating(req.query.id,req.query.rating,function(result){
    res.json(result);
  })
});

router.get('/getRating', function(req, res){
  Item.getRating(req.query.id,function(result){
    res.json(result);
  })
});

router.get('/details', function(req, res){
  Item.details(req.query.id,function(result){
    res.json(result);
  })
});

router.get("/photo/:id",function(req,res){
  res.sendfile(__dirname +"/models" + storage + req.params.id + ".jpg")
})

//testing Function
router.get('/ping', function(req, res){
    res.status(200).send("Item ping-pong!");
});

module.exports = router