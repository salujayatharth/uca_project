var express = require('express')
var router = express.Router()
var utils = require('./utils')
var passport = require('passport');

// router.use(utils.vendorisLoggedIn, function(req,res,next) {
//   next();
// })

router.get('/callback',
  passport.authenticate('local', {successRedirect:'/vendor', failureRedirect: 'vendor/ping'})
);

router.get('/', function(req,res,next){
  console.log(req.user)
    res.json(req.user);
});

//logout
router.get('/login', 
  function(req, res) {
    res.send('<form action="/vendor/login" encType="multipart/form-data" method="post"><input name="username" type=text><input name="password" type=password><input type=submit></form>');
  });

router.post('/login',passport.authenticate('local-login', {
    successRedirect : '/vendor', // redirect to the secure profile section
    failureRedirect : '/vendor/ping', // redirect back to the signup page if there is an error
  }));

router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.send('<form action="/vendor/signup" encType="multipart/form-data" method="post"><input name="username" type=text><input name="password" type=password><input type=submit></form>');
  });

  // process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/vendor', // redirect to the secure profile section
    failureRedirect : '/vendor/signup', // redirect back to the signup page if there is an error
  }));

//Add phone number to account
// router.get('/addPhone', function(req,res){
//   User.addPhone(req.user.email, req.query.phone, function(result){
//     res.json(result)
//   })
// });

// //adds address to array of addresses
// router.get('/addAddress', function(req,res){
//   User.addAddress(req.user.email, req.query.address,function(result){
//     res.json(result)
//   })
// });

// //removes all stored addresses
// router.get('/removeAllAddress', function(req,res){
//   User.removeAllAddress(req.user.email,function(result){
//     res.json(result)
//   })
// });


// router.get('/getinfo', function(req,res){
//   User.getDataByMail(req.user.email,function(result){
//     Cart.getItems(result._id,function(resp){
//       console.log(resp)
//       result.cart = resp;
//       res.json(result)
//     })
//   })
// });



//testing Function
router.get('/ping', function(req, res){
  console.log(req.user)
  res.status(200).send("User ping-pong!");
});

module.exports = router