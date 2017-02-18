var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },

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
        }
})

var User = module.exports = mongoose.model('logins', userSchema);

module.exports.addUserToDb = function(data){
    console.log("inserting into db: " + data.email)
        User.create(data, function(err, row){
        if(err || !row){
            console.log("Could not insert")
        }
        else{
            // cart.add(row.id)
        }
    })

}

module.exports.addPhoneToUser = function(mail,phone){
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

module.exports.getDataByMail = function(mail,cb){
    User.findOne({'email':mail},function(err, result){
        if(err || !result){
            console.log("User not found")
            cb(false)
        }
        else
        {
            cb(result)
        }
    })
}

