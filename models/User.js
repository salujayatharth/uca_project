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
    }
})

var User = module.exports = mongoose.model('logins', userSchema);

module.exports.store = function(id,name,mail){
        console.log("Adding User : " + mail)
        User.create(new User({id:id,
                            name:name,
                            email:mail
                        }))
    }