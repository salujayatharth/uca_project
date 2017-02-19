var mongoose = require('mongoose');
var storage = require('../config.json').photoStore;
//Schema for cart
var itemSchema = mongoose.Schema({

    name: {
        type:String,
        required: true
    },
    count:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        default:"general"
    },
    reviews:
        [{
            type: String
        }],
    ratings:
        [{
            type: Number
        }]
})

var Item = module.exports = mongoose.model('items', itemSchema);

//Initializing Item
Item.init = function(name,price,count,photo,cb){
    if(!name || !price || !count || !photo)
        {return cb(false)}
    console.log("Adding Item to db: " + name)

    Item.create({"name":name,"price":price,"count": count},function(err,res){
        if(err){
            console.log(err)
            cb(false)
        }
        else{
            photo.name = res._id + ".jpg";
            console.log(__dirname + storage + photo.name)
            photo.mv(__dirname + storage + photo.name,function(err){
                if (err)
                    {cb(false)}    
                else
                    {cb(res._id)}
            })
        }
    })
}

Item.addReview = function(id,review,cb){
    if(!id || !review)
        {return}
    console.log("Adding review to item: " + id)
    update = {"reviews":review}
    Item.findOneAndUpdate({_id:id},{$push:update},function(err,res){
        if(err)
            {console.log(err)
            }
        else{
            console.log("review added")
            cb(review)
        }
    })
}

Item.addRating = function(id,rating,cb){
    if(!id || !rating)
        {return}
    console.log("Adding rating to item: " + id)
    update = {"ratings":rating}
    Item.findOneAndUpdate({_id:id},{$push:update},function(err,res){
        if(err)
            {console.log(err)}
        else{
            console.log("rating added")
            cb(rating)
        }
    })
}

Item.getAll = function(cb){
    Item.find(function(err,res){
        if(err)
        {
            cb({})
        }
        else
        {
            cb(res)
        }
    })
}

Item.getReview = function(id,cb){
    console.log("Getting review for item: " + id)
    Item.findOne({_id:id},'reviews',function(err,res){
        if(err)
            {console.log(err)}
        else{
            cb(res)
        }
    })
}

Item.getRating = function(id,cb){
    console.log("Getting rating for item: " + id)
    Item.findOne({_id:id},'ratings',function(err,res){
        if(err)
            {console.log(err)}
        else{
            cb(res)
        }
    })
}


//Returns all items
Item.details = function(id,cb){
    Item.findById(id, function(err,result){
        cb(result)
    })
}