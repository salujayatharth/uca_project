module.exports = {
//checks if user is logged in, if not -> redirects to login
isLoggedIn: function(req, res, next) {

    if (req.user){
        console.log("Login present")
          // if login is there,check which one
        if(req.user.id){ //if vendor logged in,logout user and redirect to vendor
            console.log("User login found")
            return next()
        }
        else{   //if vendor logged in, continue
            console.log("vendor login found,loggin out")
            req.logout();
        }
    }
    // if they aren't redirect them to vendor login page
    res.redirect("/authenticate")
    },
vendorLoggedIn: function(req, res, next) {

    if (req.user){      // if login is there,check which one
        console.log("Login present")
        if(req.user.id) //if user logged in,logout user and redirect to vendor
            {console.log("User login found,loggin out")
                req.logout();
        }
        else{   //if vendor logged in, continue
            console.log("Vendor login found")
            return next()
        }
    }
    // if they aren't redirect them to vendor login page
    res.redirect("/vendor/login")
    }
}