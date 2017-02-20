var mongoose = require('mongoose');
var Cart = require('./Cart');
var userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    phone:
        {
            type: Number,
        },
    address:
        [{
            type: String
        }]

})

var User = module.exports = mongoose.model('logins', userSchema);

User.addToDb = function(data){
    console.log("inserting into db: " + data.email)
        User.create(data, function(err, row){
        if(err || !row){
            console.log("Could not insert")

        }
        else{
            Cart.init(row._id,function(res){
                console.log(res)
            })
        }
    })

}

User.addPhone = function(mail,phone,cb){
    if(!mail || !phone)
        {return cb(false)}
    query = {email:mail}
    update = {phone:phone}
    User.findOneAndUpdate(query,update,function(err,resp){
        if(err){
            console.log("Did not update")
            cb(false)
        }
        else
        {
            console.log("added number")
            cb(phone)
        }
    })
}

User.addAddress = function(mail,address,cb){
    if(!mail || !address)
        {return cb(false)}
    query = {email:mail}
    update = {address:address}
    console.log(query)
    console.log(update)

    User.findOneAndUpdate(query,{$push:update},function(err,resp){
        if(err){
            console.log("Did not update:\n" + err)
            cb(false)
        }
        else
        {
            console.log("added address")
            cb(address)
        }
    })
}

User.removeAllAddress = function(mail,cb){
    query = {email:mail}
    User.findOneAndUpdate(query,{address:[]},function(err,resp){
        if(err){
            console.log("Did not update:\n" + err)
            cb(false)
        }
        else
        {
            console.log("added address")
            cb(true)
        }
    })
}

//returns all info
User.getDataByMail = function(mail,cb){
    User.findOne({'email':mail},function(err, result){
        if(err){
            console.log("User not found\n" + err)
            cb(false)
        }
        else
        {
            cb(result)
        }
    })
}

