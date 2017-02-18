var express = require('express')
var router = express.Router()
var utils = require('./utils')
var Cart = require('./models/Cart');
var User = require('./models/User');

router.use(function(req,res,next) {
  next();
})

//authorization redirects here
router.get('/', utils.isLoggedIn, function(req,res,next){
  if(req.user){
    User.getDataByMail(req.user.email,function(result){
      res.json(result);
    });
}
else
{
  res.end("cart EUREKA!!");
}
});
//Cart Functions
router.get('/additem', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.addItem(result._id,result._id,4,function(result){
      res.json(result);
    });
  })
}); 

router.get('/setitem', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.setItem(result._id,result._id,2,function(result){
      res.json(result);
    });
  })
});

router.get('/getitems', function(req, res){
  User.getDataByMail(req.user.email,function(result){
    Cart.getItems(result._id,function(result){
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