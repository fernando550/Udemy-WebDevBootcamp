var express = require('express'),
    router  = express.Router({mergeParams: true}),
    campground = require('../models/campground'),
    comment = require('../models/comment');

// ==================== COMMENT ROUTES

// NEW
router.get('/new', isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('newcomm', {camp: aCamp});
        }
    });
});

// CREATE
router.post('/', isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            comment.create(req.body.comment, function(err, comm){
                if(err){
                    console.log(err);
                } else {
                    //add username + id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //add comment to campground
                    aCamp.comments.push(comm);
                    aCamp.save();
                    res.redirect('/campgrounds/' + aCamp._id);
                }
            });
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