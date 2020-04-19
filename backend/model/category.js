const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name:{type:String,trim:true},
	sep :{type:String} //makes sure no two simmilar categories are created

})

module.exports = mongoose.model('category',categorySchema)