var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    localStrategy = require('passport-local'),
    campground  = require('./models/campground'),
    comment     = require('./models/comment'),
    user        = require('./models/user'),
    seedDB      = require('./seeds');

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

// ==================== CAMPGROUND ROUTES

// START
app.get('/', function(req, res){
    res.render('landing');
});

// INDEX
app.get('/campgrounds', function(req, res){
    campground.find({}, function(err, camp){
        if(err){
            console.log(err);
        } else {
             res.render('index', {camp: camp});
        }
    });
});

// CREATE
app.post('/campgrounds', function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.desc;
   var newCamp = {name: name, image: image, description: desc};
   //Create new campground
   campground.create(newCamp, function(err, aCamp){
      if(err){
          console.log(err);
      } else {
          res.redirect('/campgrounds');
      }
   });
});

// NEW
app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

// SHOW
app.get('/campgrounds/:id', function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('show', {camp: aCamp});
        }
    });
});

// ==================== COMMENT ROUTES

// NEW
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('newcomm', {camp: aCamp});
        }
    });
});

// CREATE
app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            comment.create(req.body.comment, function(err, comm){
                if(err){
                    console.log(err);
                } else {
                    aCamp.comments.push(comm);
                    aCamp.save();
                    res.redirect('/campgrounds/' + aCamp._id);
                }
            });
        }
    });
});

// ==================== AUTHENTICATION ROUTES

// REGISTER - account creation page
app.get('/register', function(req, res){
    res.render('register');
});

// REGISTER - create account
app.post('/register', function(req, res){
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
app.get('/login', function(req, res){
    res.render('login');
});

// LOGIN - sign in
app.post('/login', passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res){
});

// LOGOUT
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

// ==================== PORT ==================== \\
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp 1.0.0');
})