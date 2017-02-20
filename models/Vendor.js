var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var vendorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        unique: true,
        required: true
    },
    phone:
        {
            type: Number
        },
    address:
        [{
            type: String
        }]

})

var Vendor = module.exports = mongoose.model('vendors', vendorSchema);

Vendor.addToDb = function(name, password, cb){
    console.log("inserting into db: " + name)
        query = {name:name,password:Vendor.generateHash(password)}
        Vendor.create(query, function(err, row){
            if(err)
                {console.log(err)}
            return cb(err,row)
        })
}

Vendor.verifyPassword = function(id,password,cb) {
    Vendor.findOne({"_id":id},'password',function(err,resp){
    cb(bcrypt.compareSync(password, resp.password))
    })
};

Vendor.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Vendor.addPhone = function(name,phone,cb){
//     if(!mail || !phone)
//         {return cb({})}
//     query = {name:name}
//     update = {phone:phone}
//     Vendor.findOneAndUpdate(query,update,function(err,resp){
//         if(err || !resp){
//             console.log("Did not update")
//             cb({})
//         }
//         else
//         {
//             console.log("added number")
//             cb(phone)
//         }
//     })
// }

// User.addAddress = function(mail,address,cb){
//     if(!mail || !address)
//         {return cb({})}
//     query = {email:mail}
//     update = {address:address}
//     console.log(query)
//     console.log(update)

//     User.findOneAndUpdate(query,{$push:update},function(err,resp){
//         if(err || !resp){
//             console.log("Did not update: " + err)
//             cb({})
//         }
//         else
//         {
//             console.log("added address")
//             cb(address)
//         }
//     })
// }
// User.removeAllAddress = function(mail,cb){
//     query = {email:mail}
//     User.findOneAndUpdate(query,{address:[]},function(err,resp){
//         if(err || !resp){
//             console.log("Did not update: " + err)
//             cb(false)
//         }
//         else
//         {
//             console.log("added address")
//             cb(true)
//         }
//     })
// }

// //returns all info
// User.getDataByMail = function(mail,cb){
//     User.findOne({'email':mail},function(err, result){
//         if(err || !result){
//             console.log("User not found")
//             cb({})
//         }
//         else
//         {
//             cb(result)
//         }
//     })
// }

