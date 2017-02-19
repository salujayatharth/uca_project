//get secret environment variables
require('dotenv').config();

//logger
var morgan = require('morgan');

//configuration file
var config = require('./config.json');

//routes for the app
var userRoutes = require('./user_route')
var cartRoutes = require('./cart_route')
var itemRoutes = require('./item_route')

var express = require('express');
var fileUpload = require('express-fileupload');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//basic utilities
var utils = require('./utils')

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
    data = {id:profile.id,name:profile.displayName,email:profile.emails[0].value,photo:profile.photos[0].value}
    User.addToDb(data)
    return done(null,data);
  }
));


passport.serializeUser(function(user, cb) {
  console.log('serializing user: ' + user.email);
  cb(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing user');
  done(null, user);
})

//setting up app configuration
//DO NOT CHANGE ORDER
app.use(morgan(':date[clf] :status :method :url :response-time'))
app.use(cookieParser(process.env.cookieSecret));
app.use(fileUpload());
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: process.env.cookieSecret,
                      resave: true, saveUninitialized: true,
                      store: new MongoStore({ mongooseConnection: mongoose.connection }),
                      cookie:{secure: false, maxAge: 604800000}}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//callback method for Oauth
app.get('/callback',
  passport.authenticate('google', {successRedirect:'/user', failureRedirect: '/ping'}));

//authentication call
app.get('/authenticate',
  passport.authenticate('google', { scope: ['email','profile'] }));

app.get('/ping',function(req,res){
  res.send("pong!!")
})

app.use('/user',userRoutes)
app.use('/cart',cartRoutes)
app.use('/item',itemRoutes)
//start the app
var server = app.listen(PORT)