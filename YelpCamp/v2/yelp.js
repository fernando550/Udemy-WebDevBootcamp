var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

// CONFIGURATION
mongoose.connect('mongodb://localhost/yelpcamp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// SCHEMA
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campground = mongoose.model('campground', campSchema);

// // ROUTES

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
   campground.create(newCamp, function(err, nCamp){
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
    campground.findById(req.params.id, function(err, aCamp){
        if(err){
            console.log(err);
        } else {
            res.render('show', {camp: aCamp});
        }
    });
});

// PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp 1.0.0');
})