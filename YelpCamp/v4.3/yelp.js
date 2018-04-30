var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    localStrategy = require('passport-local'),
    user        = require('./models/user'),
    seedDB      = require('./seeds');

var commentRoutes   = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes     = require('./routes/index');
    
// ==================== CONFIGURATION
mongoose.connect('mongodb://localhost/yelpcamp');
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

// ==================== PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'This is a secret!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

// ==================== ROUTES CONFIGURATION
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);


// ==================== PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp 1.0.0');
})