var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Items = require('./Items')

var vendorSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        //TO BE DONE
        // required: true
    },
    password:{
        type: String,
        unique: true,
        required: true
    },
    phone:
        {
            type: Number,
            //TO BE DONE
            // required: true
        },
    address:
        [{
            type: String
        }],
    items:[{
        type: mongoose.Schema.ObjectId,
        ref: 'items'
    }],


})

var Vendor = module.exports = mongoose.model('vendors', vendorSchema);

Vendor.addToDb = function(username, password, cb){
    console.log("inserting into db: " + username)
        query = {"username":username,password:Vendor.generateHash(password)}
        Vendor.create(query, function(err, row){
            if(err)
                {console.log(err)}
            row.password = null;
            return cb(err,row)
        })
}

Vendor.verifyPassword = function(id,password,cb) {
    console.log("Verifying Password");
    Vendor.findOne({"_id":id},'password',function(err,resp){
    cb(bcrypt.compareSync(password, resp.password))
    })
};

Vendor.generateHash = function(password) {
    console.log("Generating Hash")
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Vendor.getDetails = function(username,cb){
    console.log("Getting details for:" + username)
    Vendor.findOne({"username":username},'-password',function (err,resp){
        if(err)
            {console.log(err)
                cb(resp,false)}
        else
        {cb(resp)}
    }).populate("items")
}

Vendor.addAddress = function(username,address,cb){
    if(!username || !address)
        {return cb({})}
    query = {username:username}
    update = {address:address}
    console.log(query)
    console.log(update)
    Vendor.findOneAndUpdate(query,{$push:update},function(err,resp){
        if(err){
            console.log("Did not update:\n" + err)
            cb()
        }
        else
        {
            console.log("added address")
            cb(address)
        }
    })
}

Vendor.removeAllAddress = function(username,cb){
    query = {username:username}
    Vendor.findOneAndUpdate(query,{address:[]},function(err,resp){
        if(err || !resp){
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

Vendor.addItem = function(id,name,price,count,photo,cb){
    Items.init(name,price,count,photo,function(resp){
        if(!resp)
            {return cb(false)}
        update = {"items":resp}
        Vendor.findOneAndUpdate({_id:id},{$push:update},function(err,res){
            if(err)
                {console.log(err)
                cb(false)}
            else{
                console.log("item added by vendor")
                cb(true)
            }
        })
    })
}

