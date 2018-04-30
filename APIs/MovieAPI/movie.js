var express = require("express");
var app = express();
var request = require("request");
//___________________________________

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var pData = JSON.parse(body);
            res.render("results", {data: pData});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
})