var express = require('express')
var router = express.Router()
var utils = require('../utils')
var passport = require('passport');
var vendor = require('../models/Vendor')

//always called for vendor calls
router.use(function(req,res,next) {
  next();
})

//authentication redirector
router.get('/callback',
  passport.authenticate('local-login', {successRedirect:'/vendor', failureRedirect: 'vendor/ping'})
);


//returns vendor details
router.get('/', utils.vendorLoggedIn, function(req,res,next){
  vendor.getDetails(req.user.username,function(resp){
    res.json(resp)
  })
});

//login-form
router.get('/login', function(req, res) {
  res.send('<form action="/vendor/login" encType="multipart/form-data" method="post"><input name="username" type=text><input name="password" type=password><input type=submit></form>');
});

//login request
router.post('/login',passport.authenticate('local-login', {
  successRedirect : '/vendor', // redirect to the secure profile section
  failureRedirect : '/vendor/ping', // redirect back to the signup page if there is an error
}));


//signup form
router.get('/signup', function(req, res) {
  res.send('<form action="/vendor/signup" encType="multipart/form-data" method="post"><input name="username" type=text><input name="password" type=password><input type=submit></form>');
  });

//signup request
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/vendor', // redirect to the secure profile section
  failureRedirect : '/vendor/signup', // redirect back to the signup page if there is an error
}));

//adds address to array of addresses
router.get('/addAddress', function(req,res){
  vendor.addAddress(req.user.username, req.query.address,function(result){
    res.json(result)
  })
});

//removes all stored addresses
router.get('/removeAllAddress', function(req,res){
  vendor.removeAllAddress(req.user.username,function(result){
    res.json(result)
  })
});


//add item request
router.post('/addItem', function(req, res){
  vendor.getDetails(req.user.username,function(result){
    vendor.addItem(result._id,req.body.name,req.body.price,req.body.count,req.files.photo,function(result){
      res.json(result);
    });
  })
});

// sample uploader/add item form
router.get('/addItem', function(req,res,next){
  res.send('<form action="/vendor/addItem" encType="multipart/form-data" method=post><input name="name" type=text><input name="price" type=number><input name="count" type=number><input name="photo" type="file" /><input type=submit></form>')
});

//testing Function
router.get('/ping', function(req, res){
  res.status(200).send("Vendor ping-pong!");
});

module.exports = router