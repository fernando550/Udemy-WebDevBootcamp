var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/my/:page", function(req, res){
    var page = req.params.page;
    res.render("page.ejs", {myVar: page});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});