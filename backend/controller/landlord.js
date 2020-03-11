const User = require('../model/users_singup');
const Property = require('../model/property');

//shows each landlord's own property

const landlord_property = (req,res)=> {
	Property.find().where(owner.id)
}