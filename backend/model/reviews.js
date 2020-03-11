const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	
	content :{type:String,Trim:true},
	author:{
			id: {
				type:mongoose.Schema.Types.ObjectId,
				ref: 'users_singup'
			},
			username: String
	}
})

module.exports = mongoose.model('reviews',reviewSchema);