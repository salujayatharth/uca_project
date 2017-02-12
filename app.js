require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config.json');
var mongoose = require('mongoose')
var utils = require('./utils')
var cookieParser = require('cookie-parser')
var passport = require('passport');
var strategy = require('passport-google-oauth20').Strategy;

var app = express();
var PORT = process.argv[2] || 9090
mongoose.connect(config.connectionString);

passport.use(new strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    if (profile) {
    user = profile;
    return cb(null, user);
    }
    else {
    return cb(null, false);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
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


app.get('/authenticate', passport.authenticate('google', { scope: ['profile'] }));

app.get('/login',  function(req, res){
    utils.log(arguments[0].route)
    res.end("<a href = /authenticate>Click here!</>")

});

app.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/authenticate' }),
  function(req, res) {
    utils.log(arguments[0].route)
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/', function(req, res){
    utils.log(arguments[0].route)
    res.end("hurray!! send_flowers is working with authentication for ")

});


app.get('/test', function(req, res){
    utils.log(arguments[0].route)
    res.end("hurray!! send_flowers is working")

});

var server = app.listen(PORT)