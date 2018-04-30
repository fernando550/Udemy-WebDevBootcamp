var mongoose = require('mongoose');
var campground = require('./models/campground');
var comment = require('./models/comment');

var data =[
    {
        name: "Cloud's Rest",
        image:"http://www.photosforclass.com/download/1342367857",
        description: "Description A"
    },
    {
        name: "Rocky Mountains",
        image:"http://www.photosforclass.com/download/4670974422",
        description: "Description B"
    },
    {
        name: "Apkanuka Landing",
        image:"http://www.photosforclass.com/download/1331589629",
        description: "Description C"
    }
    ];
    
function seedDB(){
    campground.remove({});
    comment.remove({});
    console.log('cleared database');
    
    // campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
        
    //     comment.remove({});
    //     console.log('cleared database');
    //     // Add a few campgrounds from array
    //     data.forEach(function(seed){
    //         campground.create(seed, function(err, camp){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 console.log('added a campground object');
    //                 // Add a comment to each campground
    //                 comment.create(
    //                 {
    //                     text: 'Test text...',
    //                     author: 'Author ABC'
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         console.log('added a comment');
    //                         camp.comments.push(comment);
    //                         camp.save();
    //                     }
    //                 });
    //             }
    //         });     
    //     });
    // });
        
    
}



module.exports = seedDB;