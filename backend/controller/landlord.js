const User = require('../model/users_singup');
const Property = require('../model/property');

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




module.exports = {landlord_property}



//Property.find({Owner:{owner:owners}}).then((property)=> {