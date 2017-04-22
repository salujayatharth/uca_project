var express = require('express')
var router = express.Router()
var utils = require('../utils')
var User = require('../models/User');
var Cart = require('../models/Cart');

router.use(utils.isLoggedIn, function(req,res,next) {
  next();
})

//returns user info
router.get('/', function(req,res,next){
  User.getDataByMail(req.user.email,function(result){
    res.json(result);
  })
});

//logout
router.get('/logout', function(req, res){
  console.log("Logging out")
  req.logout();
  res.redirect('/ping');
});

//Add phone number to account
router.get('/addPhone', function(req,res){
  User.addPhone(req.user.email, req.query.phone, function(result){
    res.json(result)
  })
});

//adds address to array of addresses
router.get('/addAddress', function(req,res){
  User.addAddress(req.user.email, req.query.address,function(result){
    res.json(result)
  })
});

//removes all stored addresses
router.get('/removeAllAddress', function(req,res){
  User.removeAllAddress(req.user.email,function(result){
    res.json(result)
  })
});


//work this out
router.get('/getinfo', function(req,res){
  User.getDataByMail(req.user.email,function(result){
    Cart.getItems(result._id,function(resp){
      console.log(resp)
      result.cart = resp;
      res.json(result)
    })
  })
});

//testing Function
router.get('/ping', function(req, res){
  res.status(200).send("User ping-pong!");
});

module.exports = router