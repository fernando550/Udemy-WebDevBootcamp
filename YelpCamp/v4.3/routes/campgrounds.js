var express = require('express'),
    router  = express.Router(),
    campground = require('../models/campground');

// ==================== CAMPGROUND ROUTES

// INDEX
router.get('/', function(req, res){
    campground.find({}, function(err, camp){
        if(err){
            console.log(err);
        } else {
             res.render('index', {camp: camp});
        }
    });
});

// CREATE
router.post('/', isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.desc;
   var author = {id: req.user._id, username: req.user.username};
   var newCamp = {name: name, image: image, description: desc, author: author};
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
router.get('/new', isLoggedIn, function(req, res){
    res.render('new');
});

// SHOW
router.get('/:id', function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('show', {camp: aCamp});
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;