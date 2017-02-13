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
    }
})

var User = mongoose.model('user', userSchema);

module.exports = {
    store: function(id,name){
        console.log("Adding User : " + id +"-"+ name)
        User.create(new User({id:id,name:name}))
    }
}