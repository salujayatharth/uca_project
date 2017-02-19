var mongoose = require('mongoose');
//Schema for cart
var cartSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.ObjectId,
        ref: 'logins'
    },

    items:{    
        type: [{
            _id: {   
                type: mongoose.Schema.ObjectId,
                ref: 'items'
                },
            count: {
                type: Number,
                default:0,
                min:0
                }
            }],
        default: []
    }
})

var Cart = module.exports = mongoose.model('cart', cartSchema);

//Initializing Cart
Cart.init = function(id,cb){
    console.log("Adding cart for user: " + id)
    Cart.create({_id:id},function(err,res){
        if(err){
            console.log(err)
            cb(false)
        }
        else{
            cb(true)
        }
    })
}

//Adds or update data to cart
Cart.addItem = function(id,item_id,count,cb){
    if(!count)
        {count = 1}
    if(!id || !item_id || !count)
        {return cb({})}
    Cart.findOne({"_id":id,"items._id":item_id},function (err,res) {
        if(err || !res)
            {
            console.log("Adding new item to cart")
            Cart.findOneAndUpdate({_id:id},{$push:{items:{_id:item_id, count:count}}},
                function(err,res){
                    cb(res)
                })
        }
        else
            {
            console.log("Updating item count in cart")
            Cart.findOneAndUpdate({"_id":id,"items._id": item_id},
                                    {"$inc": {"items.$.count":count}},
                function(err,res){
                    cb(res)
                }
            )   
        }
    })
}

Cart.setItem = function(id,item_id,count,cb) {
    if(!id || !item_id || !count)
        {return cb({})}
    Cart.findOneAndUpdate({"_id":id,"items._id": item_id},
                                    {"items.$.count":count},
        function(err,res){
            console.log(res)
            cb(res)
        }
    )   
}

//Returns all items
Cart.getItems = function(id,cb){
    Cart.findById(id, function(err,result){
        cb(result)
    })
}

//empty's Full Cart
Cart.empty = function(id,cb){
    console.log("Removing all items from cart: " + id)
    Cart.findOneAndUpdate({"_id":id},{items:[]},function(err,res){
        if(err){
            cb(false)
        }
        else{
            cb(true)
        }
    })
}