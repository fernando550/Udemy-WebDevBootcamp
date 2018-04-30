var express     = require('express'),
    app         = express(),
    override    = require('method-override'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');
    
// ================ CONFIGURATION ================ \\
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(override('_method'));

// ==================== SCHEMA ==================== \\
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var blog = mongoose.model('blog', blogSchema);

// ==================== ROUTES ==================== \\

// START
app.get('/', function(req, res){
    res.redirect('/blogs');
});

// INDEX
app.get('/blogs', function(req, res){
    blog.find({}, function(err, ablog){
        if(err){
            console.log(err);
        } else {
             res.render('index', {blog: ablog});
        }
    });
});

// NEW
app.get('/blogs/new', function(req, res){
    res.render('new');
});

// CREATE
app.post('/blogs', function(req, res){
   var title = req.body.title;
   var image = req.body.image;
   var body = req.body.body;
   var newBlog = {title: title, image: image, body: body};
   //Create new campground
   blog.create(newBlog, function(err, nCamp){
      if(err){
          console.log(err);
      } else {
          res.redirect('/blogs');
      }
   });
});


// SHOW
app.get('/blogs/:id', function(req, res){
    blog.findById(req.params.id, function(err, ablog){
        if(err){
            console.log(err);
        } else {
            res.render('show', {blog: ablog});
        }
    });
});

// EDIT
app.get('/blogs/:id/edit', function(req, res){
    blog.findById(req.params.id, function(err, ablog){
        if(err){
            console.log(err);
        } else {
            res.render('edit', {blog: ablog});
        }
    });
});

// UPDATE
app.put('/blogs/:id', function(req, res){
   var title = req.body.title;
   var image = req.body.image;
   var body = req.body.body;
   var newBlog = {title: title, image: image, body: body};
   
    blog.findByIdAndUpdate(req.params.id, newBlog, function(err, ablog){
        if(err){
            console.log(err);
        } else {
            res.redirect('/blogs/' + req.params.id);
            console.log(req.params.id);
        }
    });
});

// DELETE
app.delete('/blogs/:id', function(req, res){
   blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
       } else {
           res.redirect('/blogs');
       }
   }); 
});

// ==================== PORT ==================== \\
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('RESTful Blog App 1.0.0');
})