var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");



mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/campdb", {useNewUrlParser: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// {
// 	name:"Big Yosemite", 
// 	image:"https://images.unsplash.com/flagged/photo-1551032327-63456bda8d00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"

// }, function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("newly created campground");
// 		console.log(campground);
// 	}
// });

/*var campgrounds =[{name:"Little Yosemite", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
					  {name:"Santa Cruz beach", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"},
	                  {name:"Mission peak", image:"https://image.shutterstock.com/image-photo/lush-green-hills-wildflowers-oak-600w-681494164.jpg"}
					 ]*/


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
	var newCampground = {name: name,image: image};
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



app.listen(3000, function(){
	console.log("Campfinder server is on");
});