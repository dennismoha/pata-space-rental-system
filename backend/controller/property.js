const Property = require('../model/property');
const category = require('../model/category')
const multer = require('multer');
const fileUpload = require('express-fileupload')
const fs = require('fs-extra');
const mkdrp = require('mkdirp');
const mv = require('mv');
const path = require('path')

const new_property =(req,res) => {
	const upload = multer({storage}).single('photo')
	upload(req,res, (err)=> {
		if(err) {
			throw err			
		}
		console.log('file uploaded to the server')
		console.log(req.file)

		//sending files to cloudinary
		const cloudinary = require('cloudinary').v2
		cloudinary.config({
		cloud_name: '#',
		api_key: '#',
		api_secret: '#'

		})

		const path = req.file.path
		console.log(path);
		const uniquefilename = new Date().toISOString()

		cloudinary.uploader.upload(
			path,
			{public_id: `blog/${uniquefilename}`, tags: `blog`},
			(err,photo)=> {
				if(err){
					res.send(err)
					console.log('error uploading to cloudinary')					

				}
						console.log(photo)
						const property = new  Property({
							title : req.body.title,
							description : req.body.description,
							price : req.body.price,
							// category : req.body.category,
							quantity : req.body.quantity,
							sold : req.body.sold,
							photo:photo.secure_url,
							Owner: {
								id:req.params.id,
								owner: req.user.firstname + " " + req.user.lastname
							}
						});	

						console.log(req)

						console.log(property.owner);

						property.save().then(
							(property)=> {
								if(property){

									console.log('this is the property',property)
									res.render('landlord/property_show',{property:property})
								}
								
							}).catch((error)=> {
								throw error;
								console.log('error in adding new property');
							})

							
				
			}
			)
	})
	

}

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
		console.log(property)
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



const Search = (req,res) => {
	const Name = req.query.search;
	console.log(req.query.search)
	category.find({name:req.query.search},function(err, results) {
		if(err) {
			throw err
		} else if(results && results.length == 0) {
			res.json({message: 'property not found'})
		}else {
		console.log('these are the results',results)
		res.json(results)
	
	}
	})
}

module.exports = {properties,new_property,user_property_page,user_landing_property_page,Search,oneProperty }



