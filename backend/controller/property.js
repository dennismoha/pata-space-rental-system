const Property = require('../model/property');
const category = require('../model/category')
const multer = require('multer');
const fileUpload = require('express-fileupload')
const fs = require('fs-extra');
const mkdrp = require('mkdirp');
const mv = require('mv');
const path = require('path')

const new_property =(req,res) => {
		

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



