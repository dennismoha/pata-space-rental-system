const User = require('../model/users_singup');
const Property = require('../model/property');

//shows each landlord's own property
const landlord_property = (req,res)=> {
	Property.find({Owner:req.user}).then((property)=> {
		if(property) {
			console.log(property)
			res.render('landlord/all_properties',{property:property})
		}
	}).catch((error)=> {
		throw error
	})
}




module.exports = {landlord_property}