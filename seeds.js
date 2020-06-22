var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
	{
		name:"Panther Beach",
		image:"https://static1.squarespace.com/static/5162c7bae4b058e82d8b06d4/t/52b20253e4b043a21f583b53/1387397716883/Panther+Beach.jpg?format=1500w",
		description:"Panther Beach in santa cruz"
	},
	{
		name:"San francisco beach",
		image:"https://assets3.thrillist.com/v1/image/2759411/381x254/crop;jpeg_quality=65.jpg",
		description:"Beach in SF"
	},
	{
		name:"Lake Tahoe",
		image:"https://tahoemoonproperties.com/wp-content/uploads/2019/12/kings-beach-lake-tahoe-1500x609.jpg",
		description:"Beach at Tahoe"
	}

]


function seedDB(){
	//Removes campgrounds from db
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
		//add campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err,campground){
				if(err){
					console.log(err);
				}else{
					console.log("added a campground");
					Comment.create(
						{
							text:"This is a very scenic place",
							author:"Test user 1"
						
						}, function(err,comment){
							if(err){
								console.log(err+"error here");
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
							

						});
				}
			});
		});
	});

	
}

module.exports = seedDB;