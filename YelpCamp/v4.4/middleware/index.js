var campground = require('../models/campground'),
    comment = require('../models/comment'),
    midware = {};

//middleware
midware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

midware.checkCampgroundOwner = function(req, res, next){
    if (req.isAuthenticated()){
        campground.findById(req.params.id, function(err, aCamp){
            if(err){
                return res.redirect('back');
            } else {
                if(aCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    return res.redirect('back');
                }
            }
        });
    } else {
        return res.redirect('back');
    }
};

midware.checkCommentOwner = function(req, res, next){
    if (req.isAuthenticated()){
        comment.findById(req.params.cid, function(err, aComment){
            if(err){
                return res.redirect('back');
            } else {
                if(aComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    return res.redirect('back');
                }
            }
        });
    } else {
        return res.redirect('back');
    }
};

module.exports = midware;