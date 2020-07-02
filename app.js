var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

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
			res.render("campgrounds/campgrounds",{campgrounds:Allcampgrounds});
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
			console.log("1 campground added");
			res.redirect("/campgrounds");
		}
	})
});

app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/newcamp.ejs");

});

app.get("/campgrounds/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/showcampground",{campground: foundCampground});
		}
	});
});

//Comments routes==========================================================

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
});

app.post("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			})
		}
	})
})

//=========================================================================
app.listen(3000, function(){
	console.log("Campfinder server is on");
});