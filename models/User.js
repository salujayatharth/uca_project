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
            required: false
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

User.addPhone = function(mail,phone){
        query = {email:mail}
        update = {phone:phone}
        User.findOneAndUpdate(query,update,function(err,resp){
            if(err || !resp){
                console.log("Did not update")
        }
            else
            {
                console.log("added number")
            }
        })
}

User.addAddress = function(mail,address){
        query = {email:mail}
        update = {address:address}
        User.findOneAndUpdate(query,{$push:update},function(err,resp){
            if(err || !resp){
                console.log("Did not update: " + err)
        }
            else
            {
                console.log("added address")
            }
        })
}
User.removeAllAddress = function(mail){
        query = {email:mail}
        User.findOneAndUpdate(query,{address:[]},function(err,resp){
            if(err || !resp){
                console.log("Did not update: " + err)
        }
            else
            {
                console.log("added address")
            }
        })
}

User.getDataByMail = function(mail,cb){
    User.findOne({'email':mail},function(err, result){
        if(err || !result){
            console.log("User not found")
            cb({})
        }
        else
        {
            cb(result)
        }
    })
}

