const User = require('../model/users_singup');
const Property = require('../model/property');
const Category = require('../model/category');
const fs = require('fs-extra');


//shows each landlord's own property
const landlord_property = (req,res)=> {
	const owners = req.user.firstname + " " + req.user.lastname
	console.log('this is the properties page, the req.user is ', owners)
	Property.find({Owner:{owner:owners}}).then((property)=> {
		if(property) {
			console.log(property)
			res.render('landlord/all_properties',{property:property})
		}
	}).catch((error)=> {
		throw error
	})
}


//when a user clicks a specific property. this route shows all the properties of that user
const landlord_all_property = (req,res)=> {
	
		const own = req.params.prop
		console.log('own ',req.params.prop)
	Property.find({Owner:{owner:own}}).then((property)=> {
		if(property){
			console.log('the properties are: ' , property)
			res.status(200).json(property)
		}
	}).catch((error)=> {
		throw error
	})
}

//show a single item property
const landlord_show = (req,res)=> {
	Property.findById(req.params.id).then((property)=> {
		if(property) {
			res.render('landlord/property_show',{property:property});
		}
	}).catch((error)=> {
		throw error
	})

}

//takes you to one property edit page with the property details
// const landlord_edit_property = (req,res)=> {
// console.log('the req.files in edit',req.files)
// 	const id = req.params.id;
// 	Category.find().then((cat)=> {
// 		Property.findById(id).then((property)=> {
// 			if(property) {


// 				res.render('landlord/property_edit',{
// 					title:property.title,
// 					description:property.description,
// 					price : property.price,
// 					quantity:property.quantity,
// 					categories:cat,
// 					category:property.category,
// 					sold: property.sold

// 				})
// 			}
// 		}).catch((error)=> {
// 			throw error
// 		})
// 	})
// }

const landlord_edit_property = (req,res)=> {
	console.log('the req.files in edit',req.files)
		const id = req.params.id;
		Category.find().then((cat)=> {
			Property.findById(id).then((property)=> {
				if(property) {
	
	
					res.render('landlord/property_edit',{
						title:property.title,
						description:property.description,
						price : property.price,
						quantity:property.quantity,
						categories:cat,
						category:property.category,
						sold: property.sold
	
					})
				}
			}).catch((error)=> {
				throw error
			})
		})
	}


//landlord property delete
const land_prop_delete = (req,res)=> {
	const id = req.params.id;
	
	fs.rmdir('public/images/'+ req.params.id,{recursive:true},function(err) {
		if(err) {
			throw err;
			console.log('error deleting a propery', err)
		}
		Property.findByIdAndRemove(id,(err)=> {
			if(err) {
				throw err;
				
			}
			res.redirect('/landlord/landlord/owner/properties')
		})
	});

	//fs.rmdirSync works with node v 12.0 +

	// fs.rmdirSync("public/images/"+req.params.id, {recursive: true}, (error) => { 
	// 	if (error) { 
	// 	  console.log(error); 
	// 	} 
	// 	else { 
	// 		Property.findByIdAndRemove(id,(err)=> {
	// 					if(err) {
	// 						throw err;
							
	// 					}
	// 					res.send('property removed successfully');
	// 				})
			
	// 	} 
	//   }); 
}




module.exports = {landlord_property,landlord_all_property,landlord_show,landlord_edit_property,land_prop_delete }



