var express = require('express'),
    router  = express.Router(),
    user = require('../models/user'),
    passport = require('passport');

// START
router.get('/', function(req, res){
    res.render('landing');
});

// ==================== AUTHENTICATION ROUTES

// REGISTER - account creation page
router.get('/register', function(req, res){
    res.render('register');
});

// REGISTER - create account
router.post('/register', function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});

// LOGIN - account login page
router.get('/login', function(req, res){
    res.render('login');
});

// LOGIN - sign in
router.post('/login', passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res){
});

// LOGOUT
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;