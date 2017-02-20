module.exports = {
//checks if user is logged in, if not -> redirects to login
isLoggedIn: function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/authenticate');
    },
vendorLoggedIn: function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.user){
        if(!req.user.id)
            {return next();
        }
    }

    // if they aren't redirect them to the home page
    res.redirect('/authenticate');
    }
}