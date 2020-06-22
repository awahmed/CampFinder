var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


seedDB();
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/campdb", {useNewUrlParser: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");




app.get("/", function(req,res){
	res.render("landing");

});

app.get("/campgrounds",function(req,res){
	Campground.find({}, function(err,Allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds",{campgrounds:Allcampgrounds});
		}
	});
});

app.post("/campgrounds",function(req,res){
	//get data from the form and 
	//redirect back to the route above this
	//res.send("you hit campgrounds post route");
	var name = req.body.addname;
	var image = req.body.addimage;
	var description = req.body.adddesc;
	var newCampground = {name: name, image: image, description: description};
	//add campground to db
	Campground.create(newCampground, function(err,insertedCampground){
		if (err) {
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	})

	

});

app.get("/campgrounds/new",function(req,res){
	res.render("newcamp.ejs");

});

app.get("/campgrounds/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("showcampground",{campground: foundCampground});
		}
	});
});


app.listen(3000, function(){
	console.log("Campfinder server is on");
});