const Property = require('../model/property');
const category = require('../model/category')
const fileUpload = require('express-fileupload')
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const mv = require('mv');
const path = require('path')
const moment = require('moment')
const { check, validationResult } = require('express-validator');
const { raw } = require('body-parser');
const propertyInterested = require('../model/property_interested')

//creating a new property
const new_property = (req,res)=> {
	console.log('the req.body is',req.body)
	var imageFile ;
	if(!req.files) {
		imageFile = ""
	}else {
		imageFil = req.files.photo.name
		imageFile = req.files.photo
	}


	var title = req.body.title
	var description = req.body.description
	var price = req.body.price
	var quantity = req.body.quantity
	var sold = req.body.sold
	var mode = req.body.rentalMode
	var date = new Date();

	req.checkBody('title','title cannot be empty').notEmpty();	
	req.checkBody('description','description cannot be empty').notEmpty()
	req.checkBody('price','price cannot be empty').notEmpty()
	req.checkBody('quantity','quantity cannot be empty').notEmpty()
	req.checkBody('sold','sold cannot be empty').notEmpty()

	var errors = req.validationErrors();

	if(errors) {
		var message =[];
		errors.forEach(function(error){
			message.push(error)
		})

		category.find().then((category)=> {
				req.flash('error',error)
			res.render('landlord/property_create',{messages:req.flash('error'), category:category,title,description,price,quantity,sold});
		})
	}

	var property = new Property({
		title:title,
		description:description,
		price:price,
		category:req.body.category,
		quantity:quantity,
		sold:sold,
		rentalMode:mode,
		Owner: {
								id:req.params.id,
								owner: req.user.firstname + " " + req.user.lastname
							},
		posted: date.toDateString(),
		photo:imageFil
	})

	property.save().then((property)=> {
		if(property) {
			//mkdirp('public/images/' + property.id + "/"  ).then(made=> console.log(`images folder created${made}`));

			mkdirp('public/images/' + property.id).then(made =>
  					console.log(`made directories, starting with ${made}`))

			mkdirp('public/images/' + property.id + '/gallery').then(made =>
  							console.log(`made directories, starting with ${made}`))


			var propertyImage = req.files.photo;
			console.log('the propertyImage is ',propertyImage)
			var path = 'public/images/' + property.id + '/gallery/' + imageFil
			propertyImage.mv(path,(err)=> {
				if(err){
					console.log('the property image error is ', err)
				throw err
				}
				
			})
		}
		res.redirect('/landlord/landlord/owner/properties');
	}).catch((error)=> {
		throw error
	})
};

//getting all properties
const properties = (req,res) => {
	Property.find().then(
		(property)=> {
			if(property) {
				 res.render('landlord/all_properties',{property: property})

			}
			
		}).catch((error)=> {
			throw error
			console.log('error in the find all property route',error)
		})
}

//one property
const oneProperty = (req,res) => {

	Property.findById(req.params.id).populate('reviews').exec((err,property)=> {
		if(err) {
			console.log('error populating the reviews ');
			throw err
		}
		
		res.render('properties/show',{property:property})
	})
}





const user_property_page = (req,res) => {
	Property.find().then(
		(property)=> {
			if(property) {

				 res.render('home/property',{property: property})

			}
			
		}).catch((error)=> {
			throw error
			console.log('error in the find all property route',error)
		})
}

const user_landing_property_page = (req,res) => {
	Property.find().then(
		(property)=> {
			if(property) {
				console.log(property)
				 res.render('home/landing',{property: property})

			}
			
		}).catch((error)=> {
			throw error
			console.log('error in the find all property route',error)
		})
}


// const property_Interested = (req,res)=> {
// 	console.log('reached the property interesed controller')
// 	Property.findByIdAndUpdate(req.params.id,{$inc:{interested:1}},{new:true}).then((property)=> {
// 		if(property) {
// 			console.log('the propery route has been reachd')
// 			res.send(property)
// 		}
// 	}).catch((error)=> {
// 		throw error;
// 	})
// }


const property_Interested = (req,res)=> {
	console.log('reached the property interesed controller')
	console.log(req.params)
	const email = req.params.email;
	const title = req.params.title;
	var interested = 0;

	propertyInterested.findOne({property:req.params.id}).then((property)=> {		
		if(!property) {
			const prop = new propertyInterested({
				email : {
					id:req.params._id,
					owner:email					
				},
				property: {
					id: req.params.id,
					property:title
				},				 
							
			});

			prop.save().then((succ)=> {
				res.send(succ);
			})

		}else if(property.email.owner != req.params.email) {
				property.updateOne({$inc:{interested:1}});
				property.save();

			}
		
	}).catch((error)=> {
		throw error
	})

// 	propertyInterested.findOne({email:req.params.email}).then((person)=> {
// 		if(person) {					
// 			person.updateOne({$inc:{interested:-1}});
// 			person.save();
// 			res.send(person)
// 		}else if(!person) {
// 			const interesed = new propertyInterested({

// 			})

// 		}

// 	const interesed = new propertyInterested({
// 		naame:Stringl
// 	})
	
// }).catch((error)=>{
// 	throw error
// })

}
const Search = (req,res) => {
	const Name = req.query.search;
	console.log(req.query.search)
	category.find({name:req.query.search},function(err, results) {
		if(err) {
			throw err
		} else if(results && results.length == 0) {
			res.json({message: 'property not found'})
		}else {
		console.log('these are the results')
		res.json(results)
	
	}
	})
}

module.exports = {properties,new_property,user_property_page,user_landing_property_page,Search,oneProperty,property_Interested }



