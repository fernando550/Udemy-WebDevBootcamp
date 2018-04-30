var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!") 
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "oink", 
        cow: "moo",
        dog: "woof woof"
    }
    
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];

    // sound = (animal === "pig") ? "oink" : (animal === "cow" ? "moo" : "woof woof")
    
    console.log(sound);
    res.send("The " + animal + " goes " + sound);
});

app.get("/repeat/:msg/:num", function(req, res){
    var msg = req.params.msg;
    var num = Number(req.params.num);
    var output = "";
    
    for(var i=0; i<num; i++){
        output += msg + " ";
    }
    
    res.send(output);
});

app.get("*", function(req, res){
   res.send("Sorry page not found...What are you doing with your life?") 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started!") 
});