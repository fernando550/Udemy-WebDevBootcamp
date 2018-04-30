var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var camp = [
    { name: "Lepete", image: "https://www.nhstateparks.org/uploads/images/slideshow/crawford-notch-state-park/03_Crawford-Notch-State-Park.jpg"},
    { name: "Topiliki", image: "http://fwf.punjab.gov.pk/sites/fwf.punjab.gov.pk/files/Camping-Sites.jpg"},
    { name: "Sileke", image: "http://www.acadiamagic.com/1170px/blackwoods-1197.jpg"},
    { name: "Lepete", image: "https://www.nhstateparks.org/uploads/images/slideshow/crawford-notch-state-park/03_Crawford-Notch-State-Park.jpg"},
    { name: "Topiliki", image: "http://fwf.punjab.gov.pk/sites/fwf.punjab.gov.pk/files/Camping-Sites.jpg"},
    { name: "Sileke", image: "http://www.acadiamagic.com/1170px/blackwoods-1197.jpg"},
    { name: "Lepete", image: "https://www.nhstateparks.org/uploads/images/slideshow/crawford-notch-state-park/03_Crawford-Notch-State-Park.jpg"},
    { name: "Topiliki", image: "http://fwf.punjab.gov.pk/sites/fwf.punjab.gov.pk/files/Camping-Sites.jpg"},
    { name: "Sileke", image: "http://www.acadiamagic.com/1170px/blackwoods-1197.jpg"},
];
    
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render("camp", {camp: camp});
});

app.post('/campgrounds', function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCamp = {name: name, image: image};
   camp.push(newCamp);
   res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp 1.0.0');
})