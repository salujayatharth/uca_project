//get secret environment variables
require('dotenv').config();

//logger
var morgan = require('morgan');

//configuration file
var config = require('./config.json');

var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//basic utilities
var utils = require('./utils')
var cookieParser = require('cookie-parser')

//Authetication helper
var passport = require('passport');
var strategy = require('passport-google-oauth').OAuth2Strategy;

//db connection
mongoose.connect(config.connectionString);
//db model
var User = require('./models/User');

var app = express();
var PORT = config.port;

//setting upn authentication statergy
passport.use(new strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //Storing profile
    User.store(profile.id,profile.displayName,profile.emails[0].value)
    return done(null,profile);
  }
));


passport.serializeUser(function(user, cb) {
    console.log('serializing user, ' + user.id);
  cb(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing user ' + user);
  done(null, user);
})

//setting up app configuration
//DO NOT CHANGE ORDER
app.use(morgan(':date[clf] :status :method :url :response-time'))
app.use(cookieParser(process.env.cookieSecret));
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: process.env.cookieSecret, resave: true, saveUninitialized: true,
                        cookie:{secure: false, maxAge: null}}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//authentication call
app.get('/authenticate',
  passport.authenticate('google', { scope: ['email','profile'] }));

//callback method
app.get('/callback',
  passport.authenticate('google', {successRedirect:'/', failureRedirect: '/login'}));


//TO be used
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


//authorization redirects here
app.get('/', function(req,res){
  if(req.user){
    console.log(req.user.displayName);
    res.end("Eureka!! " + req.user.dislplayName);
}
else
{
  res.end("EUREKA!!");
}
});


//testing Function
app.get('/test', function(req, res){
    res.end("hurray!! send_flowers is working");

});

//start the app
var server = app.listen(PORT)