require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config.json');
var mongoose = require('mongoose')
var utils = require('./utils')
var cookieParser = require('cookie-parser')
var passport = require('passport');
var strategy = require('passport-google-oauth20').Strategy;
mongoose.connect(config.connectionString);

var user = require('./models/User');
var app = express();
var PORT = process.argv[2] || 9090;

passport.use(new strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    user.store(profile.id, profile.displayName)
    return cb(null,profile || false)
  }
));

passport.serializeUser(function(user, cb) {
    console.log('serializing user');
  cb(null, user.id);
});

passport.deserializeUser(function(obj, cb) {
    console.log('deserializing user');
  cb(null, obj);
});


app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.get(
  // Login url
  '/authenticate',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },

  // Start OAuth 2 flow using Passport.js
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/login',  function(req, res){
    utils.log(arguments[0].route)
    res.end("<a href = /authenticate>Click here!</>")

});

app.get('/callback', passport.authenticate('google',  
    { successRedirect: '/', failureRedirect: '/login' }
));


app.get('/', function(req, res){
    utils.log(arguments[0].route)
    res.end("" + req)

});


app.get('/test', function(req, res){
    utils.log(arguments[0].route)
    res.end("hurray!! send_flowers is working")

});

var server = app.listen(PORT)