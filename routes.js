var express = require('express')
var router = express.Router()
var passport = require('passport')
var utils = require('./utils')
var User = require('./models/User');

router.use(function(req,res,next) {
  next();
})

//callback method for Oauth
router.get('/callback',
  passport.authenticate('google', {successRedirect:'/', failureRedirect: '/login'}));

//authentication call
router.get('/authenticate',
  passport.authenticate('google', { scope: ['email','profile'] }));

//authorization redirects here
router.get('/', utils.isLoggedIn, function(req,res,next){
  if(req.user){
    User.getDataByMail(req.user.email,function(result){
      res.json(result);
    });
}
else
{
  res.end("EUREKA!!");
}
});

//logout
router.get('/logout', function(req, res){
    console.log("Logging out")
    req.logout();
    res.redirect('/test');
});


//testing Function
router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router