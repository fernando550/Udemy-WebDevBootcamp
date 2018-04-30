var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyparser = require('body-parser'),
    localPassport = require('passport-local'),
    localMongoose = require('passport-local-mongoose'),
    user = require('./models/user');
    

// // // CONFIGURATION
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authdemo');
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: 'You are definitely in secret mode',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localPassport(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// // // ROUTES
app.get('/', function(req, res){
    res.render('home');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/secret');
        });
    });
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("AuthDemo 1.0.0");
})