var express = require('express'),
    router  = express.Router({mergeParams: true}),
    midware = require('../middleware'),
    campground = require('../models/campground'),
    comment = require('../models/comment');

// ==================== COMMENT ROUTES

// NEW
router.get('/new', midware.isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('newcomm', {camp: aCamp});
        }
    });
});

// CREATE
router.post('/', midware.isLoggedIn, function(req, res){
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
                    comm.author.id = req.user._id;
                    comm.author.username = req.user.username;
                    comm.save();
                    //add comment to campground
                    aCamp.comments.push(comm);
                    aCamp.save();
                    res.redirect('/campgrounds/' + aCamp._id);
                }
            });
        }
    });
});

// EDIT
router.get('/:cid/edit', midware.checkCommentOwner, function(req, res){
    comment.findById(req.params.cid, function(err, aComment){
        if(err){
            res.redirect('back');
        }
        res.render('editcomm', {campground_id: req.params.id, comment: aComment});
    });
});

// UPDATE
router.put('/:cid', midware.checkCommentOwner, function(req, res){
    comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, aComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE
router.delete('/:cid', midware.checkCommentOwner, function(req, res){
    comment.findByIdAndRemove(req.params.cid, function(err){
        if(err){
            res.redirect('back');
        }
        res.redirect('/campgrounds' + req.params.id);
    });
});

module.exports = router;