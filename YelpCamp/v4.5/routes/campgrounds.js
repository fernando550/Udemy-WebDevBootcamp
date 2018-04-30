var express = require('express'),
    router  = express.Router(),
    midware = require('../middleware'),
    campground = require('../models/campground');

// ==================== CAMPGROUND ROUTES

// INDEX
router.get('/', function(req, res){
    campground.find({}, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
             res.render('index', {campground: aCamp});
        }
    });
});

// CREATE
router.post('/', midware.isLoggedIn, function(req, res){
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
router.get('/new', midware.isLoggedIn, function(req, res){
    res.render('new');
});

// SHOW
router.get('/:id', function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('show', {campground: aCamp});
        }
    });
});

// EDIT
router.get('/:id/edit', midware.checkCampgroundOwner, function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
        }
        res.render('edit', {campground: aCamp});
    });
});

// UPDATE
router.put('/:id', midware.checkCampgroundOwner, function(req, res){
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE
router.delete('/:id', midware.checkCampgroundOwner, function(req, res){
    campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/campgrounds');
    });
});

module.exports = router;