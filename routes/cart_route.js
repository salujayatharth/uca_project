var express = require('express')
var router = express.Router()
var utils = require('../utils')
var Cart = require('../models/Cart');
var User = require('../models/User');

router.use(utils.isLoggedIn, function(req,res,next) {
  next();
})

//get all items in cart
router.get('/', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.getItems(result._id,function(result){
      res.json(result);
    });
  })
});

//Cart Functions
router.get('/additem', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.addItem(result._id,req.query.item,req.query.count,function(resp){
      res.json(resp);
    });
  })
}); 

router.get('/setitem', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.setItem(result._id,req.query.item,req.query.count,function(result){
      res.json(result);
    });
  })
});


router.get('/empty', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.empty(result._id,function(result){
      res.json(result);
    });
  })
});

//testing Function
router.get('/ping', function(req, res){
    res.status(200).send("Cart ping-pong!");
});

module.exports = router