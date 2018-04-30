var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    campground = require('./models/campground'),
    comment = require('./models/comment'),
    seedDB = require('./seeds');

// ================ CONFIGURATION ================ \\
mongoose.connect('mongodb://localhost/yelpcamp');
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

// ==================== CAMPGROUND ROUTES ==================== \\

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

// ==================== COMMENT ROUTES ==================== \\

// NEW
app.get('/campgrounds/:id/comments/new', function(req, res){
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('newcomm', {camp: aCamp});
        }
    });
});

// CREATE
app.post('/campgrounds/:id/comments', function(req, res){
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


// ==================== PORT ==================== \\
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp 1.0.0');
})